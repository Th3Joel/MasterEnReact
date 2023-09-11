const Publication = require("../model/publication")
const fs = require("fs");
const path = require("path");

//Importar servicios
const followService = require("../services/followService");

//Acciones de prueba
const pruebaPublication = (req,res) => {
	return res.status(200).send({
		mensaje:"Mensaje enviado desde: controllers/publication.js"
	});
}

//Guardar publicaciones
const save = (req,res)=>{
	//Recoger datos del body 
	let params = req.body;

	//Si no me llegan dar respuesta negativa

	if (!params) {return res.status(400).send({"status":"Error","Mensaje":"Debes emviar el texto de la publicación"})}

	//Crear y rellenar el ojeto del modelo

		let newPublication = new Publication(params);
		newPublication.user = req.user.id;

	//Guardar objeto en la bd

		newPublication.save()
		.then(pu=>{
			return res.status(200).send({
				"status":"succes",
				"mensaje":"Publicacion guardada",
				"publicacion":pu
			});
		}).catch(err=>{
			return res.status(400).send({"status":"Error","Mensaje":"No se ha guardado la publicacion"})
		});
}
//Sacar una publicacion en concreto
const detalle = (req,res)=>{
 	//Sacar el id de esa publiccion
		let id = req.params.id;
 	//Find con la condicion de la BD
		Publication.findById(id)
		.then(pu => {
			if (!pu) {
				return res.status(404).send({
					"status":"error",
					"mensaje":"El usuario no tiene publicaciones"
				});
			}
			return res.status(200).send({
				"status":"success",
				"publicacion":pu
			});
		})
		.catch(err => {
				return res.status(404).send({
					"status":"error",
					"mensaje":"El usuario no existe"
				});
			});
		
 	//Enviar respuesta
}

//Eliminar publicaciones

const remove = (req,res)=>{
	//Sacar el id de la publicacion
		const id = req.params.id;
	//Find y remove
		Publication.deleteMany({"user":req.user.id,"_id":id})
		.then(re => {
			return res.status(200).send({
				"status":"success",
				"mensaje":"Publicacion eliminada correctamente"
			})
		})
		.catch(err => {
			return res.status(400).send({
				"status":"error",
				"mensaje":"Ha ocurrido un error"
			})
		});
}


//Listar publicaciones de un usuario

const user = (req,res) => {
	//Sacar el id de usuario
	let id = req.params.id;
	//controllar la pagina
	let page = 1;
	if (req.params.page) {
		page = req.params.page;
	}

	let itemsPage = 5;
	//Find,populate,ordenar, paginar
	Publication.paginate({user:id},{
		page,
		limit:itemsPage,
		sort:"-created_at",
		populate:[
					{
						path:"user",
						select:"-password -__v -role -email"

					}
				]
	})//sort:"-crearted_at" se le pone menos para invertir el ordenamiento
	.then(result => {
		const {docs:pub,totalDocs,page,totalPages} = result;
		if (pub.length === 0) {
			return res.status(400).send({
				"status":"success",
				"mensaje":"EL usuario no tiene publicaciones"
			});
		}

		return res.status(200).send({
			"status":"success",
			"publicaciones":pub,
			"totalItems":totalDocs,
			"totalPaginas":totalPages,
			"paginaActual":page
		});
	})
	.catch(err => {
		return res.status(400).send({
				"status":"error",
				"mensaje":"Ha ocurrido un error, no existe el usuario"
			});
	});
}

//subir ficheros
const upload = (req, res) => {
	//Sacar id de la pubblicacion
	let pubId = req.params.id;

	//Recoger el fichero de imagenes y comprobar que existe
	if (!req.file) {
		res.status(404).send({
			status: "error",
			mensaje: "No llega imagen"
		});
	}
	//Conseguir el nombre del archivo
	let imagen = req.file.originalname;
	//Sacar la extension de archivo
	//Todo lo que se separe por un punto se covierte en un array con los elementos separados
	let imagenSplit = imagen.split("\.");

	let extension = imagenSplit[1];
	//Comprobar extension
	if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {
		//Borrar archivo
		const ruta = req.file.path;
		fs.unlinkSync(ruta);

		//Devolver respuesta
		return res.status(400).send({
			status: "error",
			mensaje: "Extension del archivo invalido"
		});
	}



	//Si no es correcta, borrar archivo, {new:true} es para que devuelva los datos actualizados del usuario
	Publication.findByIdAndUpdate({user :req.user.id,"_id":pubId}, { file: req.file.filename }, { new: true })

		//Si es correcta, guardar imagen en bd
		.then(pub => {
			//Devolver respuesta
			return res.status(200).send({
				status: "success",
				publication: pub,
				file: req.file,

			});
		})
		.catch(err => {
			return res.status(404).send({
				status: "error",
				err
			});
		});
		
}
//Devolver archivos multimedia, imagenes
const media = (req,res) => {
	//sacar el parametro de la url
		const file = req.params.file;
	//montar el path real de la imagen
		const file_path = "./uploads/publication/"+file;
	//commprobar que existe
		fs.stat(file_path,((error,estado) => {
			if(!estado){
				return res.status(404).send({
					status:"error",
					mensaje:"No existe el archivo"
				});
			}
			//Devolver un file
				return res.sendFile(path.resolve(file_path));
		}));
	
}
//Listar todas las publicaciones, feed

	const feed = async(req,res) => {
		//Sacar la pagina actual
		let page = 1;
		if (req.params.page) {
			page = req.params.page;
		}
		//Establecer numero de elementos por pagina
		let itemsPage = 5;
		//Sacar un array de indetificadores de usuarios que yo sigo como usuario identificado
			//Devolver usuario de manera limpia en un array
		let {following} = await followService.followUserIds(req.user.id);
		//Find a publicaciones in, ordenar, popular, paginar
			//Quiero que me ccontenga las publicactiones de solo los usarios que estoy sigueindo

			//Para ver publicaciones de usuarios seguidos
		Publication.paginate({
			user:{"$in":following}
		},{
			page,
			limit:itemsPage,
			populate:[
						{
							path:"user",
							select:"-password -role -__v -email"
						}
					],
			sort:"-created_at"
		})
		.then(result => {
			const {docs:pub,page,totalDocs,totalPages} = result;
				if (pub.length === 0) {
					return res.send({
						"status":"success",
						"mensaje":"No hay publicaciones disponibles"
					});
				}
				return res.status(200).send({
					"status":"success",
					publication:pub,
					following:following,
					paginaActual:page,
					totalPub:totalDocs,
					totalPagina:totalPages,
					itemsPagina:itemsPage
				});

		});


		
	}

//Exportacion
module.exports ={
	pruebaPublication,
	save,
	detalle,
	remove,
	user,
	upload,
	media,
	feed
}
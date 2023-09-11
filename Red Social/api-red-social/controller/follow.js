//Importar modelo
const Follow = require("../model/follow");

const User = require("../model/user");

//Importar servicios
const followService = require("../services/followService");

//Acciones de prueba
const pruebaFollow = (req, res) => {
	return res.status(200).send({
		mensaje: "Mensaje enviado desde: controllers/follow.js"
	});
}
//Accion de seguir
const save = (req, res) => {
	//Sacar datos por body
	const params = req.body;
	//Sacar id del usuario identoficado
	const identidad = req.user;

	//Crear objeto con modelo follow
	let userToFollow = new Follow({
		user: identidad.id,
		followed: params.followed
	});
	//Guradar objeto en base de datos

	userToFollow.save()
		.then(d => {
			return res.status(200).send({
				status: "success",
				mensaje: "Has seguido a alguien",
				follow: d

			});
		})
		.catch(err => {
			return res.status(404).send({
				status: "error",
				mensaje: err
			});
		});
	/*
	userToFollow.user = identidad.id;
	userToFollow.followed = params.followed;*/

}
const unFollow = (req, res) => {

	//Recoger el id del usuario identificado
	const identidad = req.user.id;
	//Recoger el id del usuario que sigui dejar de seguir
	const followed = req.params.id;
	//find de las coicidencias y hacer remove



	Follow.findOneAndDelete({
		"user": identidad,
		"followed": followed
	})
		.then(deletedFollow => {
			if (deletedFollow) {
				return res.status(200).send({
					status: "success",
					mensaje: "Has dejado de seguir",
					DeletedFollow: deletedFollow
				});
			} else {
				return res.status(404).send({
					status: "error",
					mensaje: "No se encontró el registro para eliminar"
				});
			}
		})
		.catch(err => {
			return res.status(500).send({
				status: "error",
				mensaje: "Error al eliminar el registro",
				err
			});
		});


}

//Accion listado de usuario que cualquier está siguiendo (estoy siguiendo a)
const siguendo = (req, res) => {
	//Sacar el id del usuario identificado
	let userId = req.user.id;
	//Comprobar si llega id por parametro en la url
	if (req.params.id) {
		userId = req.params.id; //Tiene mas prioridad el de la url
	}

	//Comprobar si me llega la pagina, defecto pagina 1
	let page = 1;

	if (req.params.page) {
		page = req.params.page;
	}

	//Usuarios por pagina quiero mostrar

	const itemsPorPagina = 3;

	//Find a follow, popular datos se los usuarios, paginar con mongosee
 
		//.find({user:userId})

	//Se sustituye por todos los datos del usuario y de seguidos
		//primer parametros de la funcion son para en que clave del objeto que contenga el id
		// del usuario se sustituya por todos los datos del usuario que corresponde al id

		//Segundo parametros son para determina que datos queremos que se muestre y que no se muestren
		// por ejemplo  name para mostrar solo ese y -name para mostras todos exepto name
	//.populate("user followed","-password -role -__v") 
	              //Cuando se usa paginate se usa de esta forma
	Follow.paginate({user:userId},{
		page,
		limit:itemsPorPagina,
		populate:[
			{
				path:"user",
				select:"-password -role -__v -email"
			},
			{
				path:"followed",
				select:"-password -role -__v -email"
			}
		]
		
		
	})
	.then(async(result) => {
		const {docs: users,totalDocs, page, totalPages} = result;

		if(users.length === 0){
			return res.status(400).send({
				status:"error",
				mensaje:"El usuario no está siguendo a nadie"
			});
		}
			//Sacar un array de ids de los usuarios que me siguen y los que sigo como usuario identificado
		let followUserIds = await followService.followUserIds(req.user.id);

		return res.status(200).send({
			status:"success",
			mensaje:"Listado de usuarios siguiendo",
			usuarios:users,
			paginaActual: page,
			ItemsPagina: itemsPorPagina,
			totalItems: totalDocs,
			paginas: totalPages,
			user_following: followUserIds.following,
			user_follow_me:followUserIds.followers
		});
	})
	.catch(err => {
		return res.status(400).send({
			status:"erro",
			mensaje:"Usuario no existe",
			err
		});
	});

	//Listado de usuarios que siguen a alguien me siguen a mi

	
	
}

//Accion de listado de usuarios que siguen a cualquier otro usuario (Soy seguido por)
const seguidos = (req, res) => {
	//Sacar el id del usuario identificado
	let userId = req.user.id;
	//Comprobar si llega id por parametro en la url
	if (req.params.id) {
		userId = req.params.id; //Tiene mas prioridad el de la url
	}

	//Comprobar si me llega la pagina, defecto pagina 1
	let page = 1;

	if (req.params.page) {
		page = req.params.page;
	}

	//Usuarios por pagina quiero mostrar

	const itemsPorPagina = 3;

	Follow.paginate({followed:userId},{
		page,
		limit:itemsPorPagina,
		populate:[
			{
				path:"user",
				select:"-password -role -__v -email"
			}
		]
		
		
	})
	.then(async(result) => {
		const {docs: users,totalDocs, page, totalPages} = result;

		if(users.length === 0){
			return res.status(400).send({
				status:"error",
				mensaje:"El usuario no está siguendo a nadie"
			});
		}
			//Sacar un array de ids de los usuarios que me siguen y los que sigo como usuario identificado
		let followUserIds = await followService.followUserIds(req.user.id);

		return res.status(200).send({
			status:"success",
			mensaje:"Listado de usuarios que me siguen",
			usuarios:users,
			paginaActual: page,
			ItemsPagina: itemsPorPagina,
			totalItems: totalDocs,
			paginas: totalPages,
			user_following: followUserIds.following,
			user_follow_me:followUserIds.followers
		});
	})
	.catch(err => {
		return res.status(400).send({
			status:"erro",
			mensaje:"Usuario no existe",
			err
		});
	});

}
//Exportacion
module.exports = {
	pruebaFollow,
	save,
	unFollow,
	siguendo,
	seguidos
}
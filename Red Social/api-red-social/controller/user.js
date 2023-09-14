//Importar dependencias y modulos
const bcrypt = require("bcrypt");
const User = require("../model/user");
const Publication = require("../model/publication");
const Follow = require("../model/follow");
const path = require("path");

const fs = require("fs");

//importar servicios
const jwt = require("../services/jwt");
const followService = require("../services/followService");

const validate = require("../helpers/validate");

//Acciones de prueba
const pruebaUser = (req, res) => {
  return res.status(200).send({
    mensaje: "Mensaje enviado desde: controllers/user.js",
    usuario: req.use,
  });
};

//Registro
const registro = (req, res) => {
  //Recoger datos de la peticion
  let params = req.body;

  //Validacionn avanzada
  try {
    validate(params);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Validacion no superada",
    });
  }

  //Comprobar que llegan bien( + validacino)
  if (!params.name || !params.email || !params.password || !params.nick) {
    //console.log("validacion de usuario incorrecta");
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //Control de usuarios duplicados
  //Condicion con or --> o condiciones dentro del array
  User.find({
    $or: [
      { email: params.email.toLowerCase() },
      { nick: params.nick.toLowerCase() },
    ],
  })
    .then((users) => {
      if (users && users.length >= 1) {
        return res.status(200).send({
          status: "success",
          mensaje: "El usuario ya existe",
        });
      } else {
        //Cifrar la contraseña
        bcrypt.hash(params.password, 10, (err, pwd) => {
          //Actualizar contraseña
          params.password = pwd;

          //Crear objeto de usuario
          let userSave = new User(params);

          //console.log(userSave);

          //Guardar usuario en la base de datos

          userSave
            .save()
            .then((data) => {
              //Devolver resultado
              return res.status(200).json({
                status: "success",
                mensaje: "Usuario registrado correctamente",
                usuario: data,
              });
            })
            .catch((err) => {
              return res.status(500).send({
                status: "error",
                mensaje: "Error al guardar el usuario",
                err,
              });
            });
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        mensaje: "Error en la consulta",
        err,
      });
    });
};

const login = (req, res) => {
  //Recoger parametros del body
  let params = req.body;
  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  //Buscar en la bd el usuario
  User.findOne({ email: params.email })
    /*
		.select({
			"password": 0
		}) //Seleccionar los datos que no lleguen
		*/
    .then((user) => {
      //Si no encuentra el usuario
      if (user == null) {
        return res.status(400).send({
          status: "error",
          mensaje: "Usuario no encontrado",
        });
      }

      //Comprobar su contraseña
      const pwd = bcrypt.compareSync(params.password, user.password);
      if (!pwd) {
        return res.status(404).send({
          status: "error",
          mensaje: "No te has registrado correctamente (contraseña erronea)",
        });
      }
      //Conseguir Token
      const token = jwt.crearToken(user);

      //Devolver Datos del usuario
      return res.status(200).send({
        status: "succes",
        mensaje: "Te has identficado correctamente",
        user: {
          id: user._id,
          name: user.name,
          nick: user.nick,
        },
        token,
      });
    })
    .catch((err) => {
      return res.status(404).send({
        status: "error",
        mensaje: "ocurrió un error",
        err,
      });
    });
};

const profile = (req, res) => {
  //Recibir el parametro del is del usuario por la url
  const id = req.params.id;
  //Consulta para sacer los datos del usuario
  User.findById({ _id: id })

    .select({ password: 0, role: 0 })

    .then(async (datos) => {
      if (!datos) {
        return res.status(404).send({
          status: "error",
          mensaje: "El usuario no existe o hay un error",
        });
      }
      //Info de seguimineto
      let followInfo = await followService.followThisUser(req.user.id, id);

      //Devolver el resultado
      //Despues devolver informacion de follows
      return res.status(200).send({
        status: "success",
        user: datos,
        following: followInfo.following,
        follower: followInfo.follower,
      });
    })

    .catch((err) => {
      return res.status(404).send({
        status: "Error",
        mensaje: err,
      });
    });
};

const listado = (req, res) => {
  //Controlar en que pajina estamos
  let page = 1;

  if (req.params.page) {
    page = req.params.page;
  }

  page = parseInt(page);
  //Consulta con mongoose paginate
  let itemsPage = 3; //Son  el numero de elementos que estaran en una pagina
  User.paginate(
    {},
    {
      page,
      limit: itemsPage,
      sort: { name: "asc" },
      select: { password: 0, email: 0, role: 0, __v: 0 },
    }
  )
    //sort --> ordenar
    //select --> 0 es igual a que no se muestre o no sse incluya en el objeto

    .then(async (result) => {
      const { docs: users, totalDocs, page, totalPages } = result;
      if (users.length === 0) {
        return res.status(404).send({
          status: "error",
          mensaje: "No hay usuarios disponibles",
        });
      }
      //Sacar un array de ids de los usuarios que me siguen y los que sigo como usuario identificado
      let followUserIds = await followService.followUserIds(req.user.id);
      //Devolver el resultado (posteriormente info follow)
      return res.status(200).send({
        status: "success",
        mensage: "Listado de usuarios",
        usuarios: users,
        paginaActual: page,
        ItemsPagina: itemsPage,
        totalItems: totalDocs,
        paginas: totalPages,
        user_following: followUserIds.following,
        user_follow_me: followUserIds.followers,
      });
    })
    .catch((error) => {
      return res.status(404).send({
        status: "error",
        mensaje: error,
      });
    });
};

const update = (req, res) => {
  //Recoger info de usuario a actualizar
  let userUpdate = req.body;
  let userActual = req.user;
  // Eliminar campos sobrantes
  delete userUpdate.iat;
  delete userUpdate.exp;
  delete userUpdate.role;
  delete userUpdate.imagen;

  //Comprobar si usuario ya existe
  //Control de usuarios duplicados
  //Condicion con or --> o condiciones dentro del array
  User.find({
    $or: [
      { email: userUpdate.email.toLowerCase() },
      { nick: userUpdate.nick.toLowerCase() },
    ],
  })
    .then(async (users) => {
      let userIsset = false;

      users.forEach((user) => {
        if (user && user._id != userActual.id) userIsset = true;
      });

      if (userIsset) {
        return res.status(200).send({
          status: "success",
          mensaje: "El usuario ya existe",
        });
      }
      //Cifrar la contraseña
      if (userUpdate.password) {
        let pwd = await bcrypt.hash(userUpdate.password, 10);
        //Actualizar contraseña
        userUpdate.password = pwd;
      } else {
        delete userUpdate.password;
      }
      //Buscar y actualizar
      User.findByIdAndUpdate({ _id: userActual.id }, userUpdate, { new: true })
        .then((user) => {
          res.status(200).send({
            status: "success",
            mensaje: "usuario actualizado correctamente",
            user,
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: "error",
            err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        mensaje: "Error en la consulta",
        err,
      });
    });
};

const upload = (req, res) => {
  //Recoger el fichero de imagenes y comprobar que existe
  if (!req.file) {
    res.status(404).send({
      status: "error",
      mensaje: "No llega imagen",
    });
  }
  //Conseguir el nombre del archivo
  let imagen = req.file.originalname;
  //Sacar la extension de archivo
  //Todo lo que se separe por un punto se covierte en un array con los elementos separados
  let imagenSplit = imagen.split(".");

  let extension = imagenSplit[1];
  //Comprobar extension
  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    //Borrar archivo
    const ruta = req.file.path;
    fs.unlinkSync(ruta);

    //Devolver respuesta
    return res.status(400).send({
      status: "error",
      mensaje: "Extension del archivo invalido",
    });
  }

  //Si no es correcta, borrar archivo, {new:true} es para que devuelva los datos actualizados del usuario
  User.findByIdAndUpdate(
    { _id: req.user.id },
    { imagen: req.file.filename },
    { new: true }
  )

    //Si es correcta, guardar imagen en bd
    .then((d) => {
      //Devolver respuesta
      return res.status(200).send({
        status: "success",
        user: d,
        file: req.file,
      });
    })
    .catch((err) => {
      return res.status(404).send({
        status: "error",
        err,
      });
    });
};

const avatar = (req, res) => {
  //sacar el parametro de la url
  const file = req.params.file;
  //montar el path real de la imagen
  const file_path = "./uploads/avatars/" + file;
  //commprobar que existe
  fs.stat(file_path, (error, estado) => {
    if (!estado) {
      return res.status(404).send({
        status: "error",
        mensaje: "No existe el archivo",
      });
    }
    //Devolver un file
    return res.sendFile(path.resolve(file_path));
  });
};

//Contadores de seguidores
const contadores = async (req, res) => {
  let userId = req.user.id;

  if (req.params.id) {
    userId = req.params.id;
  }

  const following = await Follow.count({ user: userId });
  const followed = await Follow.count({ followed: userId });
  const publication = await Publication.count({ user: userId });

  return res.status(200).send({
    status: "success",
    id: userId,
    following,
    followed,
    publication,
  });
};

//Exportacion
module.exports = {
  pruebaUser,
  registro,
  login,
  profile,
  listado,
  update,
  upload,
  avatar,
  contadores,
};

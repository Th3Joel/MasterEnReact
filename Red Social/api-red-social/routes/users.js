const express = require("express");

const router = express.Router();

const multer = require("multer");

const UserController = require("../controller/user");

const {auth} = require("../middlewares/auth");

//Configuracion de multer

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,"./uploads/avatars/")
	},

	filename:(req,file, cb) => {
		cb(null,"avatar-"+Date.now()+"-"+file.originalname)
	}
});

const upload = multer({storage});

//Definir rutas

//El middleware es algun que se ejecuta antes de la accion del controlador

router.get("/prueba-user",auth,UserController.pruebaUser);

router.post("/registro",UserController.registro);

router.post("/login",UserController.login)

router.get("/profile/:id",auth,UserController.profile);

//Para poner parametros opcionales :page?
router.get("/listado/:page?",auth,UserController.listado);

router.put("/update",auth,UserController.update);
//Para aplicar varios middlewares se meten dentro de corchetes

router.post("/upload", [auth,upload.single("file0")], UserController.upload);

router.get("/avatar/:file",UserController.avatar);

router.get("/contadores/:id?",auth,UserController.contadores)

//exportar router
module.exports = router; 
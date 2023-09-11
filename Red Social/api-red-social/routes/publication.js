const express = require("express");

const router = express.Router();

const multer = require("multer");

const publicationController = require("../controller/publication");
//Midleware de autenticacion
const {auth} = require("../middlewares/auth");

//Configuracion de multer

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,"./uploads/publication/") 
	},

	filename:(req,file, cb) => {
		cb(null,"pub-"+Date.now()+"-"+file.originalname)
	}
});

const upload = multer({storage});

//Definir rutas

router.get("/prueba-publication",publicationController.pruebaPublication);
router.post("/save",auth,publicationController.save);
router.get("/detalle/:id",auth,publicationController.detalle);
router.delete("/remove/:id",auth,publicationController.remove);
router.post("/user/:id/:page?",auth,publicationController.user);
router.post("/upload/:id",[auth,upload.single("file0")],publicationController.upload);
router.get("/media/:file",publicationController.media);
router.post("/feed/:page?",auth,publicationController.feed);


//exportar router
module.exports = router;
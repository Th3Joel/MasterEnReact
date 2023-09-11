const express = require("express");

const router = express.Router();

const followController = require("../controller/follow");

const {auth} = require("../middlewares/auth");

//Definir rutas

router.get("/prueba-follow",followController.pruebaFollow);

router.post("/save",auth,followController.save);

router.delete("/unfollow/:id",auth,followController.unFollow);

router.post("/siguiendo/:id?/:page?",auth,followController.siguendo);
router.post("/seguidos/:id?/:page?",auth,followController.seguidos);

//exportar router
module.exports = router;
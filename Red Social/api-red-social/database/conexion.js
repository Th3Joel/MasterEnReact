const mongoose = require("mongoose");

const conexion = async() => {
	try{
		await mongoose.connect("mongodb://127.0.0.1:27017/redsocial");
		console.log("Conectado a la base de datos red_social en mongodb");
	}catch(e){
		console.log(e);
		throw new Error("No se ha conectado a a base de datos");
	}
}

module.exports = conexion;
const mongoose = require("mongoose");

const conexion = async() => {
	try{
		//await mongoose.connect("mongodb://127.0.0.1:27017/redsocial");
		await mongoose.connect("mongodb+srv://joel8080ur:30QLT1EtjzX26rX0@joel.36f4ite.mongodb.net/?retryWrites=true&w=majority");
		console.log("Conectado a la base de datos red_social en mongodb");
	}catch(e){
		console.log(e);
		throw new Error("No se ha conectado a a base de datos");
	}
}

module.exports = conexion;

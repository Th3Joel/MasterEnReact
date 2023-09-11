//Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta
const clave = "clave_secreta_joel";

//Funcion para generar token

const crearToken = (user) => { 
	const payload = {
		id: user._id,
		name:user.name,
		surname:user.surname,
		nick:user.nick,
		email:user.nick,
		role:user.role,
		imagen:user.imagen,

		iat: moment().unix(),
		exp: moment().add(30,"days").unix()
	};//iat --> momento en que se creo el token
		//exp --> cuando expira el token

	//Devolver jwt token codificado
	return jwt.encode(payload,clave);
}

module.exports = {
	crearToken,
	clave
}


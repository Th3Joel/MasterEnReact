//Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//Importar clave secreta
const getjwt = require("../services/jwt");
const clave = getjwt.clave;

//Funcion de autenticacion Middleware

exports.auth = (req,res,next) =>{
	//Comprobar si me llega la cabecera de auth
		if (!req.headers.authorization) {
			return res.status(403).send({
				status:"error",
				mensaje:"La peticion no tiene la cabezera de autenticación"
			});
		}

		//Replace es para limpiar datos mediante una expresion regular
		let token = req.headers.authorization.replace(/['"]+/g, '');

		//Decodificar el token
			try{
				let payload = jwt.decode(token,clave);

				//Comprobar expiracion
				if(payload.exp <= moment().unix()){
					return res.status(401).send({
						status:"Error",
						mensaje:"Token expirado"
					});
				}
				//Agregar datos de usuario a la request
					req.user = payload;

			}catch (e){
				return res.status(404).send({
					status:"Error",
					mensaje:"Token inválido",
					error:e
				});
			}
		
		//Pasar a ejecucion de accion

			next();
}


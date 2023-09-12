//Importar dependenccias
const conexion = require("./database/conexion");
const express = require("express");
const cors = require("cors");

//Mensaje de bienvenido
console.log("API node para red social");

//Conexion a la base de datosn
conexion();

//Crear servidor node 
const app = express();
const puerto = 8080;

//Configurar cors
app.use(cors());

//Convertir los datos del body a objetos js o json
app.use(express.json());
	
//Cualquier dato que llegue con el formato urlencoded 
//se decodifique en un objeto de javascript
app.use(express.urlencoded({extended:true}));

//Cargar conf rutas
const userRuta = require("./routes/users");
const publicationRuta = require("./routes/publication");
const followRuta = require("./routes/follow");

app.use("/api/user",userRuta);
app.use("/api/publication",publicationRuta);
app.use("/api/follow",followRuta);

//Ruta de prueba
app.get("/ruta-prueba",(req, res) => {
	return res.status(200).json({
		mensaje: "funciona"
	});
})

//Poner el servidor a escuchar http 
app.listen(puerto, ()=>{
	console.log("Servidor de node corriendo en el puerto --> "+puerto);
});

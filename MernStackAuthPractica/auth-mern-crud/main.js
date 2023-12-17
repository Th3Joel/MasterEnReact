import app from "./src/app.js";
import runDB from "./src/db.js";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

runDB();
app.listen(port);
console.log("Servidor encendido en el puerto: " + port);

import express from "express";
import morgan from "morgan";
import routeUser from "./routes/user.js";
import routeTask from "./routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//Ruta de usuario
app.use("/api/user", routeUser);
//Ruta de tareas
app.use("/api/task", routeTask);

export default app;

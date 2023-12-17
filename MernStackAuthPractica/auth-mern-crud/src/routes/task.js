import { Router } from "express";
import { show, showId, store, update, remove } from "../controllers/task.js";
import auth from "../middlewares/auth.js";
import validateSchema from "../middlewares/validator.js";
import { storeVal } from "../validators/task.js";

const route = Router();
route.get("/show", auth, show);
route.get("/show/:id", auth, showId);
route.post("/store", auth, validateSchema(storeVal), store);
route.patch("/update/:id", auth, update);
route.delete("/delete/:id", auth, remove);
export default route;

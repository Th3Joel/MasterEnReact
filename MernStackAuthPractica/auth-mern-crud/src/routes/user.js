import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import validateSchema from "../middlewares/validator.js";
import { registerVal, loginVal } from "../validators/user.js";

const route = Router();

route.post("/register", validateSchema(registerVal), register);
route.post("/login", validateSchema(loginVal), login);
route.get("/logout", logout);

route.get("/profile", auth, profile);

route.get("/verify", verifyToken);

export default route;

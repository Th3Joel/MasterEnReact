import User from "../models/user.js";
import bcrypt from "bcryptjs";
import crearToken from "../libs/jwt.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(200).json({
        status: "error",
        msj: "Usuario duplicado",
      });
    }

    const passwdHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwdHash,
    });
    const userSaved = await newUser.save();
    const token = crearToken({ id: userSaved._id });

    res.cookie("token", token);
    res.status(200).json({
      status: "ok",
      token,
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
    });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    const isLogin = await bcrypt.compare(
      password,
      userFound ? userFound.password : ""
    );
    if (!isLogin) {
      return res
        .status(200)
        .json({ status: "error", msj: "Credenciales incorrectas" });
    }
    const token = crearToken({ id: userFound._id });
    res.cookie("token", token);
    return res.status(200).json({
      status: "ok",
      token,
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).json({
    status: "ok",
  });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(200).json({
      status: "error",
      msj: "Usuario no encontrado",
    });
  }
  return res.status(200).json({
    status: "ok",
    user: {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    },
  });
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      msj: "No autorizado",
    });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
    if (err) {
      return res.status(401).json({
        msj: "No autorizado",
      });
    }
    const use = await User.findById(user.id);
    if (!use) {
      return res.status(401).json({
        msj: "No autorizado",
      });
    }

    return res.status(200).json({
      id: use._id,
      username: use.username,
      email: use.email,
    });
  });
};

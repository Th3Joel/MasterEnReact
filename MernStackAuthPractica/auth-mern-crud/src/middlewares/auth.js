import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      msj: "Autorizacion requerida",
    });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "error",
    });
  }
};

export default auth;

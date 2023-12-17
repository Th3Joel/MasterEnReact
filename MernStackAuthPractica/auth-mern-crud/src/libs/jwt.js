import jwt from "jsonwebtoken";

const crearToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};

export default crearToken;

import axios from "axios";
const API = "http://localhost:9000/api";

const run = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const registerR = (user) => run.post(`/user/register`, user);
export const loginR = (user) => run.post(`/user/login`, user);
export const verificarR = () => run.get("/user/verify");

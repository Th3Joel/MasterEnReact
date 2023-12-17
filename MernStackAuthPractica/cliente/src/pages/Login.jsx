import { useForm } from "react-hook-form";
import { loginR } from "../api/auth";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
export const Login = () => {
  const { register, handleSubmit } = useForm();
  const { user, setUser, isLogin, setIsLogin } = useAuth();

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (va) => {
    const res = await loginR(va);
    console.log(res.data);
    if (res.data.user) {
      setUser(res.data.user);
      setIsLogin(true);
    }
  });

  useEffect(() => {
    if (isLogin) navigate("/tasks");
  }, [isLogin]);
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Correo"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Contraseña"
        />
        <button type="submit">Login</button>
      </form>
      <p className="flex gap-x-2 justify-between">
        No tienes cuenta?{" "}
        <NavLink to="/register" className="text-sky-500">
          Crea una
        </NavLink>
      </p>
    </div>
  );
};

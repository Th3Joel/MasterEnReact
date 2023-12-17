import { useForm } from "react-hook-form";
import { registerR } from "../api/auth";
import { useAuth } from "../context/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser, isLogin } = useAuth();
  const navigation = useNavigate();
  useEffect(() => {
    isLogin && navigation("/task");
  }, [isLogin]);
  const onSubmit = handleSubmit(async (va) => {
    const res = await registerR(va);
    console.log(res.data);
    if (res.data.user) setUser(res.data.user);
  });
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <h1>{user.email}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Usuario"
        />
        {errors.username && (
          <p className="text-red-500">Username es requerido</p>
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Correo"
        />
        {errors.email && <p className="text-red-500">Email es requerido</p>}
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Contraseña"
        />
        {errors.password && (
          <p className="text-red-500">Contraseña es requerido</p>
        )}
        <button type="submit">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between">
        ya tienes cuenta?{" "}
        <NavLink to="/login" className="text-sky-500">
          Inicia sessión
        </NavLink>
      </p>
    </div>
  );
};

import { userAuth } from "../context/AuthContext";
import "../App.css";
export const Home = () => {
  const { signout, user } = userAuth();
  return (
    <>
      <img src={user.picture} alt="" />
      <div>Bienvenido: {user.name}</div>
      <h3>{user.email}</h3>
      <h1>Has iniciado session</h1>
      <h4>Google</h4>
      <div className="card">
        <button onClick={signout}>Cerrar session</button>
      </div>
    </>
  );
};

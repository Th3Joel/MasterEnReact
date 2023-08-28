import "../App.css";
import { userAuth } from "../context/AuthContext";
export const Login = () => {
  const { signInGoogle } = userAuth();

  return (
    <>
      <div>
        <h3>Inicio de session con google y supabase</h3>
      </div>
      <h1>React + Supabase</h1>
      <h4>Google</h4>
      <div className="card">
        <button onClick={signInGoogle}>Iniciar con Google</button>
      </div>
    </>
  );
};

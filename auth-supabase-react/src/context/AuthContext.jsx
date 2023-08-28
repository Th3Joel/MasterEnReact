import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabase/supabase.config";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navegar = useNavigate();
  //Metodo que inicia session
  async function signInGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        throw new Error("A ocurrido un error en la autenticacioin: " + error);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo salir session
  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error("Un error en salir session: " + error);
    }
  }

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(false);
        //console.log("Evento: ", event);
        //console.log("Session: ", session);
        if (session == null) {
          navegar("login",{replace:true});
        } else {
          setUser(session.user.user_metadata);
          navegar("inicio",{replace:true});
        }
      }
    );

    return () => {
      listener.subscription;
    };
  }, []);

  return (
    //Se va crear el contexto que va a envolver a todos
    //los componentes hijos y se le pasan datos
    <AuthContext.Provider value={{ signInGoogle, signout, user, loading }}>
      {/** muestra un estado cargando mientras se
       * esta cargando el privider
       */}
      {loading ? <div>Cargando</div> : children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};

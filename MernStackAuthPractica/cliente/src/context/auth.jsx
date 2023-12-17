import { createContext, useState, useContext, useEffect } from "react";
import { verificarR } from "../api/auth";
import Cookie from "js-cookie";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  async function run() {
    const { token } = Cookie.get();
    if (token) {
      const data = await verificarR();
      console.log(data);

      if (data.data) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
    setLoading(false);
  }
  useEffect(() => {
    run();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, setIsLogin, isLogin }}>
      {!loading ? children : "Loading....."}
    </AuthContext.Provider>
  );
};

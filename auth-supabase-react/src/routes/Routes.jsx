import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { AuthContextProvider } from "../context/AuthContext";
export const MyRoutes = () => {
  return (
    <BrowserRouter>

      <AuthContextProvider>
        <Routes>
          <Route path="inicio" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<div>No econtrado</div>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

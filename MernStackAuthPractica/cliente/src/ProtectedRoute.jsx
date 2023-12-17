import { useAuth } from "./context/auth";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = () => {
  const { user, isLogin } = useAuth();
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

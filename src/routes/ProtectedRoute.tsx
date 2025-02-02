import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuthStore();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
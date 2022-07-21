import { useLocation, Navigate } from "react-router-dom";
import Role from "../common/Roles";
import useAuth from "../hooks/useAuth";

function RequireAuthSeller({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (auth.user.role !== Role.Seller) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuthSeller;

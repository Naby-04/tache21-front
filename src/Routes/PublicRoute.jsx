import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
    return <Navigate to="/users" replace />;
  }

  return children;
};

export default PublicRoute;

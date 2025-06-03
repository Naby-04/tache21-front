// PublicRoute.jsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin === true;

  if (token) {
    return <Navigate to={isAdmin ? "/admin" : "/users"} replace />;
  }

  return children;
};

export default PublicRoute;

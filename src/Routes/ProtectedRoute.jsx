// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.isAdmin === true;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;

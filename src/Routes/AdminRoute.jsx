import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.isAdmin === true;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/users" replace />;
  }

  return children;
};

export default AdminRoute;

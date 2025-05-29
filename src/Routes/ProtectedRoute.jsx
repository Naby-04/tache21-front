import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Si le token n'existe pas, redirige vers /login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Sinon, affiche la page demandée
  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  // Check if token exists in localStorage
  return Boolean(localStorage.getItem("token"));
};

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


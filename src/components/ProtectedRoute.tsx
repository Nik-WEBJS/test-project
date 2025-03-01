import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import React from "react";

const ProtectedRoute = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

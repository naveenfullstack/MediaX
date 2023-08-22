// PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ element }) {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;

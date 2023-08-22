// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ ...props }) {
  const { user } = useAuth();

  if (!user || !user.token) {
    // Redirect to the login page if no user or token is found
    return <Navigate to="/login" replace={true} />;
  }

  // Render the protected route if the user and token exist
  return <Route {...props} />;
}

export default PrivateRoute;

// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { token } = useAuth();

  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

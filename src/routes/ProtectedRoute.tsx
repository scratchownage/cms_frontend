import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

// Define type for ProtectedRouteProps
interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  // If user is authenticated, render children; otherwise, redirect to login
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

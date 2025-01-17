import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

// Type for ProtectedRouteProps
interface ProtectedRouteProps {
  element: React.ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;

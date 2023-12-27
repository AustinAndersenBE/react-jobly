import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
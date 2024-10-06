import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = Cookies.get('user_token');

  if (!token) return <Navigate to="/" />;

  return children;
}

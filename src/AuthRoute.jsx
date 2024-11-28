import React from 'react';
import { Navigate } from 'react-router-dom';

const isSessionValid = () => {
  const expirationTime = localStorage.getItem('expirationTime');
  if (!expirationTime || new Date().getTime() >= expirationTime) {
    localStorage.clear();
    sessionStorage.clear();
    return false;
  }
  return true;
};

const AuthRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken') && isSessionValid();

  return isAuthenticated ? children : <Navigate to="/cms" />;
};

export default AuthRoute;
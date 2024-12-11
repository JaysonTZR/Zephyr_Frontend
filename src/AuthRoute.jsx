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

const AuthRoute = ({ children, requiredAccess }) => {
  const isAuthenticated = !!localStorage.getItem('authCMSToken') && isSessionValid();
  const authUserData = localStorage.getItem('authUserData');
  const userDataObject = authUserData ? JSON.parse(authUserData) : null;
  const userAccess = userDataObject ? userDataObject.user_access.split(',').map(access => access.trim()) : [];

  if (!isAuthenticated) {
    return <Navigate to="/cms" />;
  }

  if (requiredAccess && !userAccess.includes(requiredAccess)) {
    return <Navigate to="/cms" />;
  }

  return children;
};

export default AuthRoute;

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  if (!isAuthenticated) {
    console.log('User is not authenticated. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  console.log('User is authenticated. Rendering route.');
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

const AuthenticationGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const isDisabled = location.pathname === '/login' || location.pathname === '/forget-password';

  useEffect(() => {
    async function checkAuthStatus() {
      const isAuth = await AuthenticationService.isAuthenticated();
      setIsAuthenticated(isAuth);

      setIsLoading(false);
    }

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && !isDisabled) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthenticationGuard;

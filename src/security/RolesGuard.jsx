import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

const RolesGuard = ({ children }) => {
  const [isAuthenticatedIsAdmin, setIsAuthenticatedIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const isAdminPath = location.pathname === '/user' || location.pathname === '/user/**';

  useEffect(() => {
    async function checkAdminStatus() {
      const isAdmin = AuthenticationService.isAdminOrSubAdmin();
      setIsAuthenticatedIsAdmin(isAdmin);

      setIsLoading(false);
    }

    checkAdminStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticatedIsAdmin && isAdminPath) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RolesGuard;

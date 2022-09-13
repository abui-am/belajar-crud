import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register') {
      const authData = JSON.parse(localStorage.getItem('auth'));
      if (!authData?.access_token) {
        navigate('/login');
      }
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthWrapper;

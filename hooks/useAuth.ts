import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  // accessToken 상태를 업데이트하면서 localStorage와 동기화
  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    setAccessTokenState(token);
  };

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [accessToken]);

  return {
    isAuthenticated,
    accessToken,
    setAccessToken,
  };
};

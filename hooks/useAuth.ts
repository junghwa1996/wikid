import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // accessToken 상태를 업데이트하면서 localStorage와 동기화
  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    setAccessTokenState(token);
  };

  // 클라이언트 렌더링 후 accessToken 초기화
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // 브라우저 환경에서만 localStorage 사용
    setAccessTokenState(token);
    setIsAuthenticated(!!token); // accessToken이 있으면 true로 설정
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  return {
    isAuthenticated,
    accessToken,
    setAccessToken,
  };
};

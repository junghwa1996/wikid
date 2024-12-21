import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const updateAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  };

  useEffect(() => {
    // 페이지 로드 시, localStorage에 저장된 accessToken을 확인
    updateAuthStatus(); // initial check
  }, []);

  useEffect(() => {
    // 다른 탭에서 발생하는 localStorage 변화 감지
    window.addEventListener('storage', updateAuthStatus);

    return () => {
      window.removeEventListener('storage', updateAuthStatus);
    };
  }, []);

  // `localStorage`에서 값이 변할 때마다 상태를 업데이트하는 메소드
  const handleLocalStorageChange = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  };

  // `localStorage`에서 값 변경 시 (현재 탭에서도 감지하도록)
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    // 기존 localStorage.setItem을 감싸서 변경을 감지
    localStorage.setItem = (key: string, value: string) => {
      originalSetItem.call(localStorage, key, value);
      if (key === 'accessToken') {
        handleLocalStorageChange();
      }
    };

    // 기존 localStorage.removeItem을 감싸서 삭제 감지
    localStorage.removeItem = (key: string) => {
      originalRemoveItem.call(localStorage, key);
      if (key === 'accessToken') {
        handleLocalStorageChange();
      }
    };

    // 페이지 로드 시 `accessToken`이 있는지 확인
    handleLocalStorageChange();

    return () => {
      // 리셋: 커스터마이즈된 `localStorage.setItem` 및 `removeItem` 원복
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

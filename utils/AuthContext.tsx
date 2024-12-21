import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import instance from '@/lib/axios-client';

export interface Profile {
  image: string;
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  code: string;
  name: string;
  id: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  profile: Profile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  //accessToken이 있는지 확인 (로그인 여부)
  const updateAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  };

  //사용자 프로필 가져오기
  const getProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await instance.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const profileData = res.data.profile ?? null;

      if (!profileData) {
        console.warn('Profile data is null or undefined.');
        setProfile(null);
        return;
      }

      const code = profileData.code ?? null;

      if (!code) {
        console.warn(
          'Code is null, setting profile without additional request.'
        );
        setProfile(profileData);
        return;
      }

      const profileRes = await instance.get(`/profiles/${code}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProfile(profileRes.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  //초기 인증 상태 확인
  useEffect(() => {
    updateAuthStatus();
  }, []);

  //다른 탭에서 localStorage가 변경될때 인증 상태 업데이트
  useEffect(() => {
    window.addEventListener('storage', updateAuthStatus);

    return () => {
      window.removeEventListener('storage', updateAuthStatus);
    };
  }, []);

  //accessToken이 변경되거나 삭제될때 인증 상태 업데이트
  useEffect(() => {
    const handleLocalStorageChange = () => {
      const accessToken = localStorage.getItem('accessToken');
      setIsAuthenticated(!!accessToken);

      if (accessToken) {
        getProfile();
      } else {
        setProfile(null);
      }
    };

    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = (key: string, value: string) => {
      originalSetItem.call(localStorage, key, value);
      if (key === 'accessToken') {
        handleLocalStorageChange();
      }
    };

    localStorage.removeItem = (key: string) => {
      originalRemoveItem.call(localStorage, key);
      if (key === 'accessToken') {
        handleLocalStorageChange();
      }
    };

    handleLocalStorageChange();

    return () => {
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile }}>
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

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Profile } from 'types/profile';
import instance from '@/lib/axios-client';

interface UserProfileResponse {
  profile: Profile | null;
}

interface ProfileContextType {
  isAuthenticated: boolean;
  profile: Profile | null;
  setAccessToken: (token: string | null) => void; // 토큰 설정 함수
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
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

  const getProfile = useCallback(async () => {
    if (!accessToken) {
      console.log('[디버그] 토큰 없음. 프로필을 불러올 수 없습니다.');
      return;
    }

    try {
      const res = await instance.get<UserProfileResponse>('/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const profileData = res.data.profile;

      if (!profileData) {
        setProfile(null);
        setIsAuthenticated(false);
        return;
      }

      // 추가 정보 가져오기
      if (profileData.code) {
        const profileRes = await instance.get<Profile>(
          `/profiles/${profileData.code}`
        );
        setProfile(profileRes.data);
      } else {
        setProfile(profileData);
      }
      setIsAuthenticated(true);
    } catch {
      setProfile(null);
      setIsAuthenticated(false);
    }
  }, [accessToken]);

  // accessToken 상태 변화 감지
  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      getProfile();
    } else {
      setIsAuthenticated(false);
      setProfile(null);
    }
  }, [accessToken, getProfile]); // accessToken이 변경될 때마다 실행

  return (
    <ProfileContext.Provider
      value={{ isAuthenticated, profile, setAccessToken }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

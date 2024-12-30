import { createContext, ReactNode } from 'react';
import { Profile } from 'types/profile';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

interface ProfileContextType {
  isAuthenticated: boolean;
  profile: Profile | null;
  setAccessToken: (token: string | null) => void; // 토큰 설정 함수
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, accessToken, setAccessToken } = useAuth();
  const { profile } = useProfile(accessToken);

  return (
    <ProfileContext.Provider
      value={{ isAuthenticated, profile, setAccessToken }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

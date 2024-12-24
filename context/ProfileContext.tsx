import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Profile } from 'types/profile';

import instance from '@/lib/axios-client';

interface UserProfileResponse {
  profile: Profile | null;
}

interface ProfileContextType {
  isAuthenticated: boolean;
  profile: Profile | null;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  //사용자 프로필 가져오기
  const getProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await instance.get<UserProfileResponse>('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const profileData = res.data.profile;

      if (!profileData) {
        setProfile(null);
        return;
      }

      const code = profileData.code;

      if (!code) {
        setProfile(profileData);
        return;
      }

      const profileRes = await instance.get<Profile>(`/profiles/${code}`);

      setProfile(profileRes.data);
    } catch {
      setProfile(null);
    }
  };

  //인증 상태 업데이트
  useEffect(() => {
    const handleLocalStorageChange = () => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken !== null) {
        setIsAuthenticated(true);
        getProfile().catch(() => {
          console.error('프로필을 불러오던 중 에러가 발생했습니다.');
          setProfile(null);
        });
      } else {
        setIsAuthenticated(false);
        setProfile(null);
      }
    };

    const originalSetItem = localStorage.setItem.bind(localStorage);
    const originalRemoveItem = localStorage.removeItem.bind(localStorage);

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
    <ProfileContext.Provider value={{ isAuthenticated, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

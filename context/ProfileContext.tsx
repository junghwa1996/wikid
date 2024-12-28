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
    console.log('[디버그] getProfile 함수 실행');
    const accessToken = localStorage.getItem('accessToken');
    console.log('[디버그] accessToken:', accessToken);
    try {
      const res = await instance.get<UserProfileResponse>('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('[디버그] /users/me 응답:', res.data);

      const profileData = res.data.profile;

      if (!profileData) {
        console.log('[디버그] 프로필 데이터 없음.');
        setProfile(null);
        return;
      }

      const code = profileData.code;
      console.log('[디버그] 프로필 코드:', code);

      if (!code) {
        setProfile(profileData);
        return;
      }

      const profileRes = await instance.get<Profile>(`/profiles/${code}`);
      console.log('[디버그] /profiles/:code 응답:', profileRes.data);

      setProfile(profileRes.data);
    } catch {
      console.log('[디버그] 프로필 로드 중 오류');
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
        console.log('[디버그] 인증되지 않음');
        setIsAuthenticated(false);
        setProfile(null);
      }
    };

    const originalSetItem = localStorage.setItem.bind(localStorage);
    const originalRemoveItem = localStorage.removeItem.bind(localStorage);

    localStorage.setItem = (key: string, value: string) => {
      console.log('[디버그] localStorage.setITem 호출');
      originalSetItem.call(localStorage, key, value);
      if (key === 'accessToken') {
        handleLocalStorageChange();
      }
    };

    localStorage.removeItem = (key: string) => {
      console.log('[디버그] localStorage.removeItem 호출');
      originalRemoveItem.call(localStorage, key);
      if (key === 'accessToken') {
        handleLocalStorageChange();
      }
    };

    handleLocalStorageChange();

    return () => {
      console.log('[디버그] Effect 클린업 호출');
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

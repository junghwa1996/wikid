import { useState, useCallback, useEffect } from 'react';
import { Profile } from 'types/profile';
import instance from '@/lib/axios-client';

interface UserProfileResponse {
  profile: Profile | null;
}

export const useProfile = (accessToken: string | null) => {
  const [profile, setProfile] = useState<Profile | null>(null);

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
    } catch {
      setProfile(null);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      getProfile().catch((error) => {
        console.error('[디버그] 프로필 로드 실패:', error);
      });
    } else {
      setProfile(null);
    }
  }, [accessToken, getProfile]);

  return {
    profile,
    getProfile,
  };
};

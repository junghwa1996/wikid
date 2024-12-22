import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import instance from '@/lib/axios-client';

import Contents from './components/Contents';

export interface Profile {
  updatedAt: string;
  securityAnswer: string;
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
  image: string;
  code: string;
  name: string;
  id: number;
}

const getProfileData = async (code: string) => {
  try {
    const res = await instance.get(`/profiles/${code}`);
    return res.data;
  } catch (e) {
    console.error('프로필을 불러오지 못했습니다.', e);
    return null; // 오류 발생 시 null 반환
  }
};

//TODO 임시 페이지입니다. 프로필 컴퍼넌트 제작되면 추후 제작하겠습니다.
export default function Wiki() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code && typeof code === 'string') {
      const fetchProfile = async () => {
        const profileData = await getProfileData(code as string); // code를 문자열로 변환
        if (profileData) {
          setProfile(profileData); // 프로필 상태 업데이트
        } else {
          alert('프로필을 불러오지 못했습니다.');
        }
      };

      fetchProfile();
    }
  }, [code]);

  return (
    <>
      <div className="mt-[160px] w-full pc:px-[100px] tamo:px-[20px]">
        {profile ? <Contents profile={profile} /> : <p>불러오는 중입니다...</p>}
      </div>
    </>
  );
}

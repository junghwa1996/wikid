import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProfileAnswer } from 'types/profile';

import instance from '@/lib/axios-client';
import Contents from '@/components/wiki.page/Contents';
import Spinner from '@/components/Spinner';
import IconFaceDizzy from '@/components/Svg/IconFaceDizzy';
import ErrorMessage from '@/components/ErrorMessage';

const getProfileData = async (code: string): Promise<ProfileAnswer | null> => {
  try {
    const res = await instance.get<ProfileAnswer>(`/profiles/${code}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export default function Wiki() {
  const [profile, setProfile] = useState<ProfileAnswer | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const fetchProfile = async () => {
      if (typeof code === 'string') {
        try {
          const profileData = await getProfileData(code); // code를 문자열로 변환
          if (profileData) {
            setProfile(profileData); // 프로필 상태 업데이트
          } else {
            setIsError(true);
          }
        } catch (error) {
          setIsError(true);
        }
      }
    };

    fetchProfile();
  }, [code]);

  return (
    <>
      {isError ? (
        <div className="min-h-screen">
          <div className="container flex min-h-screen items-center justify-center">
            <div className="inline-flex gap-8 px-4 mo:flex-col mo:gap-2">
              <IconFaceDizzy width={180} height={180} className="mo:mx-auto" />

              <ErrorMessage
                title="데이터를 가져오는데 문제가 있어요."
                code="500"
              >
                서버에서 전송한 데이터를 가져오는데 문제가 발생했습니다.
                <br />
                다시 한 번 시도해주세요.
              </ErrorMessage>
            </div>
          </div>
        </div>
      ) : profile ? (
        <div className="mt-[120px] flex justify-center pc:mx-[100px]">
          <Contents key={profile.code} profile={profile} />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-120px)] items-center justify-center">
          <Spinner size={10} />
        </div>
      )}
    </>
  );
}

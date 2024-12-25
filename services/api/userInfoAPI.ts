import { useProfileContext } from '@/hooks/useProfileContext';
import instance from '../../lib/axios-client';

interface UserInfo {
  id: string;
  name: string;
  profile: string | null;
}

// 사용자 정보 불러오기
export const getUserInfo = async () => {
  const { isAuthenticated } = useProfileContext();
  if (!isAuthenticated) {
    return null;
  }
  const res = await instance.get<UserInfo | null>('/users/me');
  try {
    if (res.status !== 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('사용자 정보를 불러오지 못했습니다.', error);
    return null;
  }
};

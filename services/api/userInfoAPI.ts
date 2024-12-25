import { useProfileContext } from '@/hooks/useProfileContext';
import instance from '../../lib/axios-client';

interface UserInfo {
  id: string;
  name: string;
  profile: string | null;
}

// 사용자 정보 불러오기
export const getUserInfo = async (isAuthenticated: boolean) => {
  if (!isAuthenticated) {
    console.error('로그인 상태가 아닙니다.');
    return null;
  } else {
    try {
      const res = await instance.get<UserInfo | null>('/users/me');
      return res.data;
    } catch (error) {
      console.error('사용자 정보를 불러오지 못했습니다.', error);
      return null;
    }
  }
};

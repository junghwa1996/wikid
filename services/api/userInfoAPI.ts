import instance from '../../lib/axios-client';

interface UserInfo {
  id: string;
  name: string;
  profile: string | null;
}

// 사용자 정보 불러오기
export const getUserInfo = async () => {
  try {
    const res = await instance.get<UserInfo>('/users/me');
    return res.data;
  } catch {
    throw new Error('사용자 정보를 불러오지 못했습니다.');
  }
};

import { AxiosError } from 'axios';

import instance from '../../lib/axios-client';

// 에러 처리 통합 함수
export const handleApiError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    switch (status) {
      case 400:
        throw new Error(message || '잘못된 요청입니다.');
      case 401:
        throw new Error('로그인이 필요합니다.');
      case 403:
        throw new Error('접근 권한이 없습니다.');
      case 404:
        throw new Error('요청한 리소스를 찾을 수 없습니다.');
      case 500:
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      default:
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
  throw new Error('예기치 못한 오류가 발생했습니다.');
};

export const ProfileAPI = {
  createProfile: async (data: {
    securityAnswer: string;
    securityQuestion: string;
  }) => {
    try {
      const res = await instance.post('/profiles', data);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getProfiles: async () => {
    try {
      const res = await instance.get('/profiles');
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

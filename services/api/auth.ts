import { AxiosError } from 'axios';

import instance from '../../lib/axios-client';

export const AuthAPI = {
  signin: async (data: { email: string; password: string }) => {
    try {
      const res = await instance.post('/auth/signIn', data);

      // 로그인 성공 시 토큰 저장
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // 400 에러 (이메일 또는 비밀번호 불일치)
        if (error.response?.status === 400) {
          throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
        // 500 에러 (서버 내부 오류)
        if (error.response?.status === 500) {
          throw new Error(
            '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          );
        }
      }
      // 기타 예상치 못한 에러
      throw new Error('로그인 중 오류가 발생했습니다.');
    }
  },

  signup: async (data: {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    try {
      const res = await instance.post('/auth/signUp', data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // 400 에러 (이미 존재하는 이메일)
        if (error.response?.status === 400) {
          throw new Error('이미 가입된 이메일 주소입니다.');
        }
        // 500 에러 (서버 내부 오류)
        if (error.response?.status === 500) {
          throw new Error(
            '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          );
        }
      }
      // 기타 예상치 못한 에러
      throw new Error('회원가입 중 오류가 발생했습니다.');
    }
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  }) => {
    try {
      // 새 비밀번호 일치 여부 확인
      if (data.newPassword !== data.newPasswordConfirm) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      // 기존 비밀번호와 새 비밀번호가 같은지 확인
      if (data.currentPassword === data.newPassword) {
        throw new Error('현재 비밀번호와 새 비밀번호가 같습니다.');
      }

      // 비밀번호 변경 API 호출
      const res = await instance.patch('/users/me/password', {
        currentPassword: data.currentPassword,
        password: data.newPassword,
        passwordConfirmation: data.newPasswordConfirm,
      });
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // 400 에러 (현재 비밀번호 불일치)
        if (error.response?.status === 400) {
          throw new Error('현재 비밀번호가 일치하지 않습니다.');
        }
        // 500 에러 (서버 내부 오류)
        if (error.response?.status === 500) {
          throw new Error(
            '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          );
        }
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('비밀번호 변경 중 오류가 발생했습니다.');
    }
  },
};

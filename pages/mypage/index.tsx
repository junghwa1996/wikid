import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

import Button from '@/components/Button';
import InputField from '@/components/Input';
import { useValidation } from '@/hooks/useValidation';
import { useProfileContext } from '@/hooks/useProfileContext';
import { AuthAPI } from '@/services/api/auth';
import { ProfileAPI } from '@/services/api/profileAPI';
import { useSnackbar } from 'context/SnackBarContext';
import { AxiosError } from 'axios';

function MyPage(): React.ReactElement {
  const { profile, setAccessToken } = useProfileContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [isWikiSubmitting, setIsWikiSubmitting] = useState(false);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const currentPasswordValidation = useValidation({ type: 'password' });
  const newPasswordValidation = useValidation({ type: 'password' });
  const newPasswordConfirmValidation = useValidation({
    type: 'passwordConfirm',
    compareValue: newPassword,
  });

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCurrentPassword(value);
    currentPasswordValidation.validate(value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    newPasswordValidation.validate(value);
  };

  const handleNewPasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNewPasswordConfirm(value);
    newPasswordConfirmValidation.validate(value);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isPasswordSubmitting) return;

    setIsPasswordSubmitting(true);

    try {
      await AuthAPI.changePassword({
        currentPassword,
        newPassword,
        newPasswordConfirm,
      });

      showSnackbar('비밀번호가 성공적으로 변경되었습니다.', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
      
      // 로그아웃 처리
      setAccessToken(null);
      localStorage.removeItem('refreshToken');
      router.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        showSnackbar(error.message, 'fail');
      } else if (error instanceof Error) {
        showSnackbar(error.message, 'fail');
      }
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  // 위키 생성 제출
  const handleWikiSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isWikiSubmitting) return;

    setIsWikiSubmitting(true);

    try {
      // 프로필 생성 API 호출
      const { code } = await ProfileAPI.createProfile({
        securityQuestion: question,
        securityAnswer: answer,
      });

      // 성공 시 위키 목록 페이지로 이동
      await router.push(`/wiki/${code}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data;
        showSnackbar(error.message, 'fail');

        // 이미 프로필이 존재하는 경우
        if (errorResponse?.code) {
          // 1초 후 해당 프로필로 이동
          setTimeout(async () => {
            await router.push(`/wiki/${errorResponse.code}`);
          }, 1000);
          return;
        }
      }
      // 기타 에러 처리
      showSnackbar('알 수 없는 에러가 발생했습니다.', 'fail');
    } finally {
      // 제출 상태 해제
      setIsWikiSubmitting(false);
    }
  };

  // 비밀번호 변경 폼 유효성 검사
  const isPasswordFormValid = Boolean(
    typeof currentPassword === 'string' &&
      currentPassword.length > 0 &&
      typeof newPassword === 'string' &&
      newPassword.length > 0 &&
      typeof newPasswordConfirm === 'string' &&
      newPasswordConfirm.length > 0 &&
      newPassword === newPasswordConfirm &&
      !currentPasswordValidation.errorMessage &&
      !newPasswordValidation.errorMessage &&
      !newPasswordConfirmValidation.errorMessage
  );

  const isWikiFormValid = Boolean(
    typeof question === 'string' &&
      question.length > 0 &&
      typeof answer === 'string' &&
      answer.length > 0
  );

  const inputSectionStyle = 'flex w-full flex-col items-center gap-[8px]';
  const inputContainerStyle = 'flex w-full flex-col gap-[8px]';

  return (
    <div className="flex min-h-screen justify-center pt-[221px] mo:px-[20px] mo:pb-[80px] mo:pt-[108px]">
      <div className="w-[400px] mo:w-[355px]">
        <h2 className="mb-[64px] text-center text-24sb text-gray-500">
          계정설정
        </h2>

        {/* 비밀번호 변경 폼 */}
        <form
          onSubmit={handlePasswordSubmit}
          className="mb-[32px] flex w-full flex-col items-center gap-[32px]"
        >
          <div className={inputSectionStyle}>
            <div className={inputContainerStyle}>
              <InputField
                label="비밀번호 변경"
                type="password"
                value={currentPassword}
                width="100%"
                onChange={handleCurrentPasswordChange}
                placeholder="기존 비밀번호"
              />
              <InputField
                label=""
                type="password"
                value={newPassword}
                width="100%"
                onChange={handleNewPasswordChange}
                placeholder="새 비밀번호"
              />
              <InputField
                label=""
                type="passwordConfirm"
                value={newPasswordConfirm}
                width="100%"
                onChange={handleNewPasswordConfirmChange}
                compareValue={newPassword}
                placeholder="새 비밀번호 확인"
              />
              <Button
                type="submit"
                disabled={!isPasswordFormValid}
                isLoading={Boolean(isPasswordSubmitting)}
                variant="primary"
                size="small"
                className="mt-[8px] self-end"
              >
                변경하기
              </Button>
            </div>
          </div>
        </form>

        {/* 위키가 없을 때만 구분선과 위키 생성 폼 표시 */}
        {!profile?.code && (
          <>
            <div className="w-full border-b border-gray-200"></div>
            <form
              onSubmit={handleWikiSubmit}
              className="mt-[32px] flex w-full flex-col items-center gap-[32px]"
            >
              <div className={inputSectionStyle}>
                <div className={inputContainerStyle}>
                  <InputField
                    label="위키 생성하기"
                    type="text"
                    value={question}
                    width="100%"
                    onChange={handleQuestionChange}
                    placeholder="질문을 입력해 주세요"
                  />
                  <InputField
                    label=""
                    type="text"
                    value={answer}
                    width="100%"
                    onChange={handleAnswerChange}
                    placeholder="답을 입력해 주세요"
                  />
                  <Button
                    type="submit"
                    disabled={!isWikiFormValid}
                    isLoading={Boolean(isWikiSubmitting)}
                    variant="primary"
                    size="small"
                    className="mt-[8px] self-end"
                  >
                    생성하기
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default MyPage;

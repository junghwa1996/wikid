import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '@/components/Button';
import InputField from '@/components/Input';
import SnackBar from '@/components/SnackBar';
import { AuthAPI } from '@/services/api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'fail'>('success');
  const [validFields, setValidFields] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleValidation = (field: string, isValid: boolean) => {
    setValidFields((prev) => ({
      ...prev,
      [field]: isValid,
    }));
  };

  const isFormValid = validFields.email && validFields.password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !isFormValid) return;

    setIsSubmitting(true);

    try {
      const response = (await AuthAPI.signin({
        email,
        password,
      })) as { accessToken: string };

      localStorage.setItem('accessToken', response.accessToken);
      setSnackbarMessage('로그인이 완료되었습니다');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // 페이지 이동 전까지는 버튼을 비활성화 상태로 유지
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarMessage(error.message);
        setSnackbarSeverity('fail');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('로그인 중 오류가 발생했습니다');
        setSnackbarSeverity('fail');
        setSnackbarOpen(true);
      }
      // 에러가 발생한 경우에만 isSubmitting을 false로 변경
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center pt-[233px] mo:pt-[203px]">
      <form onSubmit={handleSubmit} className="w-[400px] mo:w-[355px]">
        <div className="flex flex-col items-center gap-[24px]">
          <h2 className="mb-[40px] text-center text-2xl font-semibold text-gray-500 mo:mb-[8px] ta:mb-[24px]">
            로그인
          </h2>
          <InputField
            label="이메일"
            type="email"
            value={email}
            width="100%"
            onChange={handleEmailChange}
            placeholder="이메일을 입력해 주세요"
            onValidation={(isValid) => handleValidation('email', isValid)}
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            width="100%"
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주세요"
            onValidation={(isValid) => handleValidation('password', isValid)}
          />
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            isLoading={isSubmitting}
            variant="primary"
            className="mt-[6px] h-[45px] w-full"
          >
            로그인
          </Button>
          <div className="mt-[16px] text-center">
            <Link
              href="/signup"
              className="text-sm text-green-200 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </div>
        {snackbarOpen && (
          <SnackBar
            severity={snackbarSeverity}
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
          >
            {snackbarMessage}
          </SnackBar>
        )}
      </form>
    </div>
  );
}

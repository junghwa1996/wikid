import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@/components/Button';
import InputField from '@/components/Input';
import Link from 'next/link';

function Login(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !isFormValid) return;

    setIsSubmitting(true);
    try {
      console.log('Form submitted:', {
        email,
        password,
      });
      router.push('/signUp');
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(validFields).every(Boolean);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-[24px]">
          <h2 className="mb-[40px] text-center text-24sb text-gray-500 mo:mb-[8px] ta:mb-[24px]">
            로그인
          </h2>
          <InputField
            label="이메일"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해 주세요"
            onValidation={(isValid) => handleValidation('email', isValid)}
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주세요"
            onValidation={(isValid) => handleValidation('password', isValid)}
          />
          <Button
            type="submit"
            disabled={!isFormValid}
            isLoading={isSubmitting}
            variant="primary"
            className="mt-[6px] h-[45px] w-[400px] mo:w-[355px]"
          >
            로그인
          </Button>
          <div className="mt-[16px] text-center">
            <Link
              href="/signup"
              className="text-14 text-green-200 hover:underline"
            >
              회원가입
            </Link>
          </div>{' '}
        </div>
      </form>
    </div>
  );
}

export default Login;

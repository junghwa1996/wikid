import { useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '@/components/Input';
import Button from '@/components/Button';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // 이미 요청 중인 경우 중복 요청 방지
    alert('가입이 완료되었습니다');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-[64px] text-center text-24sb text-gray-500 mo:mb-[32px] ta:mb-[48px]">
          회원가입
        </h1>
        <InputField
          label="이름"
          type="name"
          value={name}
          onChange={handleNameChange}
          placeholder="이름을 입력해 주세요"
        />

        <InputField
          label="이메일"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력해 주세요"
        />

        <InputField
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해 주세요"
        />

        <InputField
          label="비밀번호 확인"
          type="passwordConfirm"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          placeholder="비밀번호를 다시 입력해 주세요"
          compareValue={password}
        />
        <Button
          type="submit"
          disabled={true}
          isActive={!true}
          variant="primary"
          className="mt-[30px] w-[400px] mo:w-[355px]"
        >
          가입하기
        </Button>
        <div className="mt-[40px] text-center">
          <span className="text-14 text-gray-400">이미 회원이신가요?</span>{' '}
          <a href="/login" className="text-14 text-green-300 hover:underline">
            로그인하기
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

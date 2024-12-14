import React, { useState } from 'react';
import InputField from '@/components/Input';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return '이메일 형식으로 작성해 주세요.';
    }
    return undefined;
  };

  // 패스워드 유효성 검사
  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return '8자 이상 입력해주세요.';
    }
    return undefined;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('가입이 완료되었습니다');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="이메일"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="이메일을 입력해 주세요"
        validate={validateEmail}
      />

      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호를 입력해 주세요"
        validate={validatePassword}
      />
    </form>
  );
};

export default SignUp;

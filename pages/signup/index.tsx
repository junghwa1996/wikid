import React, { useState } from 'react';
import InputField from '@/components/Input';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');

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
    alert('가입이 완료되었습니다');
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default SignUp;

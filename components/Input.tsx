import React, { useState } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'name' | 'passwordConfirm';
  placeholder?: string;
  label?: string;
  compareValue?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  compareValue,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const validateInput = (value: string) => {
    if (!value) return undefined;

    if (type === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        return '이메일 형식으로 작성해 주세요.';
      }
    }
    if (type === 'password') {
      if (value.length < 8) {
        return '8자 이상 입력해주세요.';
      }
    }
    if (type === 'name') {
      if (value.length > 10) {
        return '열 자 이하로 작성해주세요.';
      }
    }
    if (type === 'passwordConfirm' && compareValue !== undefined) {
      if (value !== compareValue) {
        return '비밀번호가 일치하지 않습니다.';
      }
    }
    return undefined;
  };

  const handleBlur = () => {
    const error = validateInput(value);
    setErrorMessage(error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const error = validateInput(e.target.value);
    setErrorMessage(error);
  };
  //스타일에 따른 클래스
  const variantClass = {
    container: 'mb-[24px] flex flex-col gap-[10px]',
    label: 'text-14 text-gray-500',
    base: 'px-[20px] py-[10px] h-[45px] w-[400px] rounded-md text-[14px] text-gray-500 placeholder:text-14 focus:outline-none mo:w-[355px]',
    error: 'border border-red-100 bg-red-50',
    normal:
      'bg-gray-100 focus:border-green-200 focus:ring-1 focus:ring-green-200',
    errorText: 'text-12 text-red-100',
  };

  const inputClass = `${variantClass.base} ${
    errorMessage ? variantClass.error : variantClass.normal
  }`;

  return (
    <div className={variantClass.container}>
      {label && <label className={variantClass.label}>{label}</label>}
      <input
        type={
          type === 'name'
            ? 'text'
            : type === 'passwordConfirm'
              ? 'password'
              : type
        }
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        className={inputClass}
      />
      {errorMessage && (
        <span className={variantClass.errorText}>{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;

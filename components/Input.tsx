import React from 'react';
import { useValidation } from 'hooks/useValidation';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'name' | 'passwordConfirm';
  placeholder?: string;
  label?: string;
  compareValue?: string;
}

function InputField({
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  compareValue,
}: InputFieldProps) {
  const { errorMessage, validate } = useValidation({
    type,
    compareValue,
  });

  const handleBlur = () => {
    validate(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (errorMessage) {
      validate(e.target.value);
    }
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
}

export default InputField;

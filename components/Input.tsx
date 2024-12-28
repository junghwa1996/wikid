import { useValidation } from 'hooks/useValidation';
import Image from 'next/image';
import React, { useState } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'name' | 'passwordConfirm';
  placeholder?: string;
  label?: string;
  compareValue?: string;
  layout?: 'vertical' | 'horizontal';
  width?: string;
  onValidation?: (isValid: boolean) => void;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
}

function InputField({
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  compareValue,
  layout = 'vertical',
  width,
  onValidation,
  ref,
  disabled,
}: InputFieldProps) {
  const { errorMessage, validate } = useValidation({
    type,
    compareValue: compareValue ?? '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    onChange(e);
    if (label !== '생일') {
      const error = validate(newValue);
      const isValid = !error && newValue.length > (type === 'name' ? 1 : 0);
      onValidation?.(isValid);
    }
  };

  const getInputType = () => {
    if (type === 'name') {
      return 'text';
    } else if (type === 'passwordConfirm' || type === 'password') {
      return showPassword ? 'text' : 'password';
    } else if (label === '생일') {
      return 'date';
    }
    return type;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //스타일에 따른 클래스
  const variantClass = {
    containerVertical: 'flex flex-col gap-[10px]',
    containerHorizontal: 'flex items-center gap-[10px]',
    labelVertical: 'text-14 text-gray-500',
    labelHorizontal: 'text-14 text-gray-400 w-[60px] flex-shrink-0',
    base: 'px-[20px] py-[10px] h-[45px] w-full rounded-md text-[14px] text-gray-500 placeholder:text-14 focus:outline-none',
    error: 'border border-red-100 bg-red-50',
    normal:
      'bg-gray-100 focus:border-green-200 focus:ring-1 focus:ring-green-200',
    errorText: 'text-12 text-red-100',
  };

  const labelClass =
    typeof layout === 'string' && layout === 'horizontal'
      ? variantClass.labelHorizontal
      : variantClass.labelVertical;

  const inputClass = `${variantClass.base} ${
    typeof layout === 'string' &&
    layout === 'vertical' &&
    typeof errorMessage === 'string' &&
    errorMessage.length > 0
      ? variantClass.error
      : variantClass.normal
  } ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  return (
    <div
      className={
        typeof layout === 'string' && layout === 'horizontal'
          ? `${variantClass.containerHorizontal} relative`
          : `${variantClass.containerVertical} relative`
      }
      style={
        typeof width === 'string' && width.length > 0 ? { width } : undefined
      }
    >
      {typeof label === 'string' && label.length > 0 && (
        <label className={labelClass}>{label}</label>
      )}
      <div className="relative flex-1">
        <input
          type={getInputType()}
          value={value}
          onChange={handleChange}
          className={`${inputClass} border-gray-200 ${label === '생일' ? '[&::-webkit-calendar-picker-indicator]:cursor-pointer' : ''}`}
          max={
            label === '생일'
              ? new Date().toISOString().split('T')[0]
              : undefined
          }
        />
        {(type === 'password' || type === 'passwordConfirm') && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={
                showPassword ? '/icon/icon-eye.svg' : '/icon/icon-eye-off.svg'
              }
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      {errorMessage && (
        <span className={variantClass.errorText}>{errorMessage}</span>
      )}
    </div>
  );
}

export default InputField;

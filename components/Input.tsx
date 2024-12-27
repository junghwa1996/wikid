import { useValidation } from 'hooks/useValidation';
import Image from 'next/image';
import React, { useState } from 'react';
import { format } from 'date-fns';

import CustomDayPicker from './DayPicker';

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
  ...props
}: InputFieldProps) {
  const { errorMessage, validate } = useValidation({
    type,
    compareValue: compareValue ?? '',
  });

  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    if (
      typeof layout === 'string' &&
      layout === 'horizontal' &&
      typeof label === 'string' &&
      label === '생일'
    ) {
      setShowDayPicker(true);
    }
  };

  const closeDayPicker = () => {
    setShowDayPicker(false);
  };

  const handleBlur = () => {
    if (value) {
      const error = validate(value);
      const isValid = !error && value.length > (type === 'name' ? 1 : 0);
      onValidation?.(isValid);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    onChange(e);
    const error = validate(newValue);
    const isValid = !error && newValue.length > (type === 'name' ? 1 : 0);
    onValidation?.(isValid);
  };

  const getInputType = () => {
    if (type === 'name') {
      return 'text';
    } else if (type === 'passwordConfirm' || type === 'password') {
      return showPassword ? 'text' : 'password';
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
      <div className="relative">
        <input
          type={getInputType()}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={inputClass}
          ref={ref}
          disabled={disabled}
          {...props}
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
      {typeof showDayPicker === 'boolean' && showDayPicker && (
        <div className="absolute left-0 top-full z-50 mt-2 rounded bg-white p-4 shadow-md">
          <div>
            <CustomDayPicker
              selected={value ? new Date(value) : undefined}
              onSelect={(date) => {
                if (date) {
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  onChange({
                    target: { value: formattedDate },
                  } as React.ChangeEvent<HTMLInputElement>);
                  setShowDayPicker(false);
                }
              }}
            />
          </div>
          <button onClick={closeDayPicker} className="mt-2 text-gray-500">
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

export default InputField;

import { useValidation } from 'hooks/useValidation';
import React, { useState } from 'react';

import CustomDayPicker from './DayPicker';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'name' | 'passwordConfirm';
  placeholder?: string;
  label?: string;
  compareValue?: string;
  layout?: 'vertical' | 'horizontal';
}

function InputField({
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  compareValue,
  layout = 'vertical',
}: InputFieldProps) {
  const { errorMessage, validate } = useValidation({
    type,
    compareValue,
  });

  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleFocus = () => {
    if (layout === 'horizontal' && label === '생일') {
      setShowDayPicker(true);
    }
  };

  const closeDayPicker = () => {
    setShowDayPicker(false);
  };

  const handleBlur = () => {
    if (layout === 'vertical')
      // 가로모드 에러 확인 비활성화
      validate(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (layout === 'vertical' && errorMessage) {
      validate(e.target.value);
    }
  };
  const getInputType = () => {
    if (type === 'name') {
      return 'text';
    } else if (type === 'passwordConfirm') {
      return 'password';
    }
    return type;
  };
  //스타일에 따른 클래스
  const variantClass = {
    containerVertical: 'mb-[24px] flex flex-col gap-[10px]',
    containerHorizontal: 'mb-[24px] w-[239px] flex items-center gap-[10px]',
    labelVertical: 'text-14 text-gray-500',
    labelHorizontal: 'text-14 text-gray-400 w-[60px] flex-shrink-0',
    base: 'px-[20px] py-[10px] h-[45px] w-[400px] rounded-md text-[14px] text-gray-500 placeholder:text-14 focus:outline-none mo:w-[355px]',
    error: 'border border-red-100 bg-red-50',
    normal:
      'bg-gray-100 focus:border-green-200 focus:ring-1 focus:ring-green-200',
    errorText: 'text-12 text-red-100',
  };
  const labelClass =
    layout === 'horizontal'
      ? variantClass.labelHorizontal
      : variantClass.labelVertical;

  const inputClass = `${variantClass.base} ${
    layout === 'vertical' && errorMessage
      ? variantClass.error
      : variantClass.normal
  }`;

  return (
    <div
      className={
        layout === 'horizontal'
          ? `${variantClass.containerHorizontal} relative`
          : `${variantClass.containerVertical} relative`
      }
    >
      {label && <label className={labelClass}>{label}</label>}
      <input
        type={getInputType()}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={inputClass}
      />
      {layout === 'vertical' && errorMessage && (
        <span className={variantClass.errorText}>{errorMessage}</span>
      )}
      {showDayPicker && (
        <div className="absolute left-0 top-full z-50 mt-2 rounded bg-white p-4 shadow-md">
          <div>
            <CustomDayPicker />
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

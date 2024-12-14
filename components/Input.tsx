import React, { useState } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  label?: string;
  validate?: (value: string) => string | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  validate,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleBlur = () => {
    if (validate) {
      const error = validate(value);
      setErrorMessage(error);
    }
  };

  return (
    <div className="mb-[24px] flex flex-col gap-[10px] space-y-1">
      {label && <label className="text-14 text-gray-500">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        className={`px-3 py-2 ${
          errorMessage
            ? 'bg-red-50'
            : 'bg-gray-100 shadow-sm focus:border-green-200 focus:ring-1 focus:ring-green-200'
        } mo:w-[355px] h-[45px] w-[400px] rounded-md text-[14px] text-gray-500 placeholder:text-14 focus:outline-none`}
      />
      {errorMessage && (
        <span className="text-12 text-red-100">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;

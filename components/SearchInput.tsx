import React, { useState } from 'react';

interface SearchInputProps {
  size: 'large' | 'medium';
  value?: string;
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

function SearchInput({
  size = 'large',
  value = '',
  onSubmit = () => {},
  placeholder,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const defaultPlaceholder =
    size === 'large' ? '이름으로 위키 검색' : '제목을 검색해 주세요.';

  // 크기별 스타일
  const sizeStyles = {
    large: {
      container: 'w-[860px] h-[45px] ',
      padding: 'p-[8px] pl-[56px] pr-[128px]',
    },
    medium: {
      container: 'w-[800px] h-[40px] ',
      padding: 'p-[8px] pl-[56px] pr-[128px]',
    },
  };

  const currentSize = sizeStyles[size];

  const inputStyles = [
    currentSize.container,
    currentSize.padding,
    'rounded-lg',
    'border-none',
    'bg-gray-100',
    'text-gray-500',
    'text-16',
    'placeholder:text-gray-400',
    isFocused
      ? 'outline outline-2 outline-green-100'
      : 'focus:outline-green-100',
  ].join(' ');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(inputValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
          <img
            src="/icon/icon-search.svg"
            alt="검색 아이콘"
            className="h-[22px] w-[22px]"
          />
        </div>

        <input
          className={inputStyles}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder || defaultPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </form>
  );
}

export default SearchInput;

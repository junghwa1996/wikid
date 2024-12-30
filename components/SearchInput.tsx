import Image from 'next/image';
import React, { useState } from 'react';

interface SearchInputProps {
  size: 'large' | 'medium' | 'full';
  value?: string;
  onSubmit?: (value: string) => void;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({
  size = 'large',
  onChange,
  value = '',
  onSubmit = () => {},
  placeholder = '검색어를 입력해 주세요',
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // 크기별 스타일
  const sizeStyles = {
    large: {
      container: 'w-[860px] h-[45px] ',
      padding: 'p-[20px] pl-[15px]',
    },
    medium: {
      container: 'w-[800px] h-[40px] ',
      padding: 'p-[20px] pl-[15px]',
    },
    full: {
      container: 'w-full h-[40px] ',
      padding: 'p-[20px] pl-[15px]',
    },
  };

  const currentSize = sizeStyles[size];

  const formStyles = [
    'flex',
    'items-center',
    'rounded-lg',
    'bg-gray-100',
    'px-[20px]',
    currentSize.container,
    currentSize.padding,
    isFocused ? 'outline outline-2 outline-green-100' : '',
  ].join(' ');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value); // 부모 컴포넌트에 값 전달
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(value); // 부모 컴포넌트에서 관리하는 value 전달
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={formStyles}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
    >
      <label htmlFor="searchInput" className="flex w-full items-center gap-2">
        <Image src="/icon/icon-search.svg" alt="검색" width={22} height={22} />
        <input
          id="searchInput"
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="h-[48px] w-full rounded-[8px] bg-transparent px-[16px] py-[12px] text-16 text-gray-500 outline-none placeholder:text-gray-300 hover:border-gray-300 focus:border-gray-500 [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!transition-[background-color] [&:-webkit-autofill]:!duration-[5000s]"
        />
      </label>
    </form>
  );
}

export default SearchInput;

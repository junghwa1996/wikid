import { useEffect, useRef, useState } from 'react';

import Menu from './Menu';

interface DropdownProps {
  options: string[];
  dropdownSize?: string;
  onSelect: (option: string) => void;
}

/**
 * 드롭다운 컴포넌트
 * @param options 메뉴팝업에 들어가는 옵션을 담을 배열
 * @param dropdownSize 팝업의 크기
 * @param onSelect 선택한 옵션을 부모 컴포넌트로 반환
 */

export default function Dropdown({
  options,
  onSelect,
  dropdownSize = 'w-auto',
}: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]); //현재 선택된 옵션
  const [isOpen, setIsOpen] = useState(false); //드롭다운 열기/닫기
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 DOM 요소 참조

  //선택한 옵션을 상태로 설정, 부모 컴포넌트로 전달
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  //외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${dropdownSize} flex items-center justify-between rounded-xl border border-gray-300 bg-background px-5 py-3.5 text-14 leading-none text-gray-400 hover:border-green-200 focus:ring-1 focus:ring-green-200`}
      >
        {selectedOption}
        <img
          src="/icon/icon-arrowdown.svg"
          className={`h-4 w-4 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <Menu
          options={options}
          onSelect={handleOptionClick}
          menuSize={dropdownSize}
        />
      )}
    </div>
  );
}
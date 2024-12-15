import { useState, useEffect, useRef } from 'react';
import Menu from './Menu';

interface DropdownProps {
  options: string[];
  dropdownSize?: string;
  onSelect: (option: string) => void;
}

export default function Dropdown({
  options,
  onSelect,
  dropdownSize = 'w-auto',
}: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

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
        className={`${dropdownSize} flex items-center justify-between rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-14 leading-none text-gray-400 hover:border-green-200 focus:ring-1 focus:ring-green-200 dark:text-gray-100`}
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

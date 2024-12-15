import React from 'react';

interface MenuProps {
  options: string[];
  menuSize?: string;
  onSelect: (option: string) => void;
}

const Menu: React.FC<MenuProps> = ({ options, onSelect, menuSize }) => {
  return (
    <ul
      className={`${menuSize} absolute z-10 mt-2 rounded-xl border border-gray-300 bg-white p-1 text-14 shadow-lg`}
    >
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => onSelect(option)}
          className={`w-auto cursor-pointer rounded-md px-3 py-2.5 hover:bg-green-100 dark:text-gray-100`}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default Menu;

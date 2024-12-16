interface MenuProps {
  options: string[];
  menuSize?: string;
  onSelect: (option: string) => void;
}

/**
 * 메뉴팝업을 띄우는 컴포넌트
 * @param options 메뉴팝업에 들어가는 옵션을 담을 배열
 * @param menuSize 팝업의 크기
 * @param onSelect 선택한 옵션을 반환
 */

export default function Menu({ options, onSelect, menuSize }: MenuProps) {
  return (
    <ul
      className={`${menuSize} absolute z-10 mt-2 rounded-xl border border-gray-300 bg-background p-1 text-14 shadow-custom`}
    >
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => onSelect(option)}
          className={`w-auto cursor-pointer rounded-md px-3 py-2.5 hover:bg-green-100`}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

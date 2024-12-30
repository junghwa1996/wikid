interface MenuProps {
  options: string[];
  menuSize?: string;
  onSelect: (option: string) => void;
  isBorder?: boolean;
}

/**
 * 메뉴팝업을 띄우는 컴포넌트
 * @param options 메뉴팝업에 들어가는 옵션을 담을 배열
 * @param menuSize 팝업의 크기
 * @param onSelect 선택한 옵션을 반환
 */

export default function Menu({
  options,
  onSelect,
  menuSize,
  isBorder = true,
}: MenuProps) {
  return (
    <ul
      className={`${menuSize} downFadein absolute z-10 mt-2 rounded-xl ${isBorder ? 'border border-gray-300' : ''} bg-background p-[4px] text-14 shadow-custom dark:shadow-custom-dark pc:right-1/2 pc:translate-x-1/2 tamo:right-0`}
    >
      {options.map((option, index) => {
        const isLogout = option === '로그아웃';
        return (
          <button
            key={index}
            tabIndex={0}
            onClick={() => onSelect(option)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(option);
            }}
            className={`flex h-[35px] w-full cursor-pointer flex-col rounded-md px-[16px] py-[5px] hover:bg-green-100 ${isLogout ? 'text-gray-400' : ''}`}
          >
            {option}
          </button>
        );
      })}
    </ul>
  );
}

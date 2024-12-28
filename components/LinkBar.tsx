import IconLink from './Svg/IconLink';

interface LinkBarProps {
  link: string;
  classNames?: string;
  onClick?: () => void;
}

/**
 * 링크 주소를 표시하는 컴포넌트
 * @param link 링크 주소
 * @param classNames 클래스 문자열
 * @param onClick 링크 클릭 시 실행할 함수
 */
export default function LinkBar({
  link,
  classNames = '',
  onClick,
}: LinkBarProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-20 items-center gap-[5px] rounded-custom bg-green-100 px-[10px] py-[3px] text-green-200 transition-colors hover:bg-green-200 hover:text-green-100 mo:py-1 ${classNames}`}
    >
      <IconLink width={20} height={20} className="size-5 mo:size-4" />
      <p className="flex-1 truncate whitespace-nowrap text-14 mo:text-12">
        {link}
      </p>
    </button>
  );
}

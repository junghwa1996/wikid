import Image from 'next/image';

interface ButtonIconProps {
  onClick: () => void;
  classNames?: string;
  type: 'write' | 'delete';
}

/**
 * 아이콘 버튼 컴포넌트
 * @param {function} onClick - 클릭 이벤트
 * @param {string} props.classNames - 커스텀 클래스
 * @param {string} props.type - 아이콘 타입
 */
export default function ButtonIcon({
  onClick,
  classNames,
  type,
}: ButtonIconProps) {
  return (
    <button onClick={onClick}>
      <Image
        src={`/icon/icon-${type}.svg`}
        alt={type === 'write' ? '수정하기' : '삭제하기'}
        className={`mo:size-5 ${classNames}`}
        width={20}
        height={20}
      />
    </button>
  );
}

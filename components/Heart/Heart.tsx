import { useState } from 'react';

import HeartIcon from './HeartIcon';

interface HeartProps {
  initialCount: number;
  onClick?: () => void;
  textSize?: string;
  iconSize?: string;
  className?: string;
}

/**
 * Heart count component
 * @param {number} initialCount - 초기 카운트 수
 * @param {function} onClick - 클릭 시 동작 할 이벤트(옵션)
 * @param {string} textSize - 텍스트 사이즈(옵션)
 * @param {string} iconSize - 아이콘 사이즈(옵션)
 * @param {string} className - 커스텀 클래스(옵션)
 * @example <Heart initialCount={10} onClick={() => console.log('클릭')} />
 */
export default function Heart({
  initialCount,
  onClick,
  textSize,
  iconSize,
  className,
}: HeartProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    if (onClick) {
      onClick();
      setIsClicked((prev) => !prev);
      setCount((prevCount) => (isClicked ? prevCount - 1 : prevCount + 1));
    }
  };

  const clickStyles = {
    icon: isClicked ? 'var(--red-100)' : 'var(--gray-400)',
    text: isClicked && 'text-red-100',
  };

  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      className={`flex items-center gap-1 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick ? handleClick : undefined}
    >
      <HeartIcon fill={clickStyles.icon} iconSize={iconSize} />
      <span
        className={`text-14 text-gray-400 mo:text-12 ${clickStyles.text} ${textSize}`}
      >
        {count}
      </span>
    </Wrapper>
  );
}

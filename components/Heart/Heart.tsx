import { useState } from 'react';

import HeartIcon from './HeartIcon';

interface HeartProps {
  initialCount: number;
  onClick?: () => void;
}

/**
 * Heart count component
 * @param {number} initialCount - 초기 카운트 수
 * @param {function} onClick - 클릭 시 동작 할 이벤트(옵션)
 * @example <Heart initialCount={10} onClick={() => console.log('클릭')} />
 */
export default function Heart({ initialCount, onClick }: HeartProps) {
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
      className={`flex items-center gap-1 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick ? handleClick : undefined}
    >
      <HeartIcon fill={clickStyles.icon} />
      <span className={`text-14 text-gray-400 mo:text-12 ${clickStyles.text}`}>
        {count}
      </span>
    </Wrapper>
  );
}

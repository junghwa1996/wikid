import { useEffect, useState } from 'react';

import HeartIcon from './HeartIcon';
import { useProfileContext } from '@/hooks/useProfileContext';

interface HeartProps {
  initialCount: number;
  onClick?: () => void;
  textSize?: string;
  iconSize?: string;
  className?: string;
  isLiked?: boolean;
}

/**
 * Heart count component
 * @param {number} initialCount - 초기 카운트 수
 * @param {function} props.onClick - 클릭 시 동작 할 이벤트(옵션)
 * @param {string} props.textSize - 텍스트 사이즈(옵션)
 * @param {string} props.iconSize - 아이콘 사이즈(옵션)
 * @param {string} props.className - 커스텀 클래스(옵션)
 * @example <Heart initialCount={10} onClick={() => console.log('클릭')} />
 */
export default function Heart({
  initialCount,
  onClick,
  textSize,
  iconSize,
  className,
  isLiked: initialIsLiked = false,
}: HeartProps) {
  const [count, setCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const { isAuthenticated } = useProfileContext();

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleClick = () => {
    if (onClick) {
      onClick();
      if (!isAuthenticated) return;
      // 좋아요 선 반영
      setCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      setIsLiked((prevIsLiked) => !prevIsLiked);
    }
  };

  const clickStyles = {
    icon: isLiked ? 'var(--red-100)' : 'var(--gray-400)',
    text: isLiked && 'text-red-100',
  };

  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      className={`flex items-center gap-1 ${className}`}
      onClick={onClick ? handleClick : undefined}
    >
      <HeartIcon fill={clickStyles.icon} iconSize={iconSize || ''} />
      <span
        className={`text-14 text-gray-400 mo:text-12 ${clickStyles.text} ${textSize}`}
      >
        {count}
      </span>
    </Wrapper>
  );
}

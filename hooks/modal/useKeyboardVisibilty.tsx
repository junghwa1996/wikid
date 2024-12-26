import React, { useEffect, useState } from 'react';

export function useKeyboardVisibility(
  inputRef: React.RefObject<HTMLInputElement>,
  isMobile: boolean
) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (!isMobile) return undefined;

    const handleKeyboardVisibility = (): void => {
      const isKeyboardVisible = window.innerHeight < window.screen.height;
      setKeyboardVisible(isKeyboardVisible);

      // 키보드가 보일 때 입력 필드로 포커스 및 스크롤
      if (isKeyboardVisible && inputRef.current !== null) {
        inputRef.current.focus();
        void setTimeout(() => {
          if (inputRef.current !== null) {
            inputRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 100);
      }
    };

    handleKeyboardVisibility();
    window.addEventListener('resize', handleKeyboardVisibility);
    return () => {
      window.removeEventListener('resize', handleKeyboardVisibility);
    };
  }, [isMobile, inputRef]);

  return keyboardVisible;
}

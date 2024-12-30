import React, { useEffect, useState } from 'react';

export function useKeyboardVisibility(
  inputRef: React.RefObject<HTMLInputElement>,
  isMobile: boolean
) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [initialScreenHeight] = useState(
    typeof window !== 'undefined' ? window.screen.height : 0
  );

  useEffect(() => {
    if (!isMobile) {
      setKeyboardVisible(false);
      return undefined;
    }

    let scrollTimeout: NodeJS.Timeout;

    const handleKeyboardVisibility = (): void => {
      // visualViewport API 사용 (지원되는 경우)
      if (window.visualViewport) {
        const isKeyboardVisible =
          window.visualViewport.height < initialScreenHeight * 0.8;
        setKeyboardVisible(isKeyboardVisible);
      } else {
        // fallback: 기존 방식
        const isKeyboardVisible =
          window.innerHeight < initialScreenHeight * 0.8;
        setKeyboardVisible(isKeyboardVisible);
      }

      // 키보드가 보일 때 입력 필드로 포커스 및 스크롤
      if (inputRef.current !== null) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (inputRef.current !== null) {
            inputRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 100);
      }
    };

    // 초기 상태 설정
    handleKeyboardVisibility();

    // 이벤트 리스너 설정
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        'resize',
        handleKeyboardVisibility
      );
      return () => {
        window.visualViewport?.removeEventListener(
          'resize',
          handleKeyboardVisibility
        );
        clearTimeout(scrollTimeout);
      };
    } else {
      window.addEventListener('resize', handleKeyboardVisibility);
      return () => {
        window.removeEventListener('resize', handleKeyboardVisibility);
        clearTimeout(scrollTimeout);
      };
    }
  }, [isMobile, inputRef, initialScreenHeight]);

  return keyboardVisible;
}

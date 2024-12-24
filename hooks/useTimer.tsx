import { useEffect, useState } from 'react';

/**
 * 타이머 훅
 * @param isActive 타이머 활성화 여부
 * @param onInactivity 타이머가 종료될 때 실행할 함수
 * @param initialTime 초기 시간 (초 단위)
 */
export const useTimer = (
  isActive: boolean,
  onInactivity: () => void,
  initialTime: number
) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    let inactivityTimeout: ReturnType<typeof setTimeout>;
    let countdownInterval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft !== null) {
      // 타이머가 활성화될 때만 초기화 (이전 timeLeft 값을 유지)
      inactivityTimeout = setTimeout(() => {
        onInactivity();
      }, timeLeft * 1000);

      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev <= 1) {
            clearInterval(countdownInterval); // 타이머 종료
            onInactivity(); // 타이머 종료 시 onInactivity 실행
            return 0;
          }
          return prev !== null ? prev - 1 : 0; // 1초마다 남은 시간 업데이트
        });
      }, 1000);

      return () => {
        clearTimeout(inactivityTimeout);
        clearInterval(countdownInterval);
      };
    }

    // 비활성화되면 타이머 초기화
    if (!isActive) {
      setTimeLeft(initialTime);
    }

    return () => {
      clearTimeout(inactivityTimeout);
      clearInterval(countdownInterval);
    };
  }, [isActive, initialTime, onInactivity, timeLeft]); // timeLeft를 의존성 배열에 추가

  return timeLeft;
};

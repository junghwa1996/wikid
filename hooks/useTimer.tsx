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
  initialTime: number = 300
) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let inactivityTimeout: ReturnType<typeof setTimeout>;
    let countdownInterval: ReturnType<typeof setInterval>;

    if (isActive) {
      // 타이머가 활성화되면 시간 초기화하고, 타이머 시작

      setTimeLeft((prev) => prev || initialTime);
      inactivityTimeout = setTimeout(() => {
        onInactivity();
      }, initialTime * 1000);

      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0)); // 1초마다 남은 시간 업데이트
      }, 1000);
      return () => {
        clearTimeout(inactivityTimeout);
        clearInterval(countdownInterval);
      };
    }

    // 정리 함수로 타이머 종료
    return () => {
      setTimeLeft(initialTime);
      clearTimeout(inactivityTimeout);
      clearInterval(countdownInterval);
    };
  }, [isActive, initialTime, onInactivity]);

  return timeLeft;
};

interface SpinnerProps {
  /** 스피너 크기 (기본값: 6 = 24px) */
  size?: 4 | 6 | 8 | 10 | 12 | 16;
  /** 테두리 두께 (기본값: 2px) */
  borderWidth?: 1 | 2 | 4;
  /** 스피너 색상 (기본값: gray-400) */
  color?: 'white' | 'gray-400' | 'gray-500' | 'green-200' | 'green-300';
  /** 추가 스타일 클래스 */
  className?: string;
}

/**
 * 로딩 상태를 표시하는 스피너 컴포넌트
 * size 값에 따른 실제 픽셀 크기:
 * - 4: 16px
 * - 6: 24px
 * - 8: 32px
 * - 10: 40px
 * - 12: 48px
 * - 16: 64px
 */
export default function Spinner({
  size = 6,
  borderWidth = 2,
  color = 'gray-400',
  className = '',
}: SpinnerProps) {
  // 색상 매핑
  const colorClasses = {
    white: 'border-white',
    'gray-400': 'border-gray-400',
    'gray-500': 'border-gray-500',
    'green-200': 'border-green-200',
    'green-300': 'border-green-300',
  };

  // size 값을 실제 픽셀 크기로 변환
  const sizeClass = {
    4: 'h-4 w-4', // 16px
    6: 'h-6 w-6', // 24px
    8: 'h-8 w-8', // 32px
    10: 'h-10 w-10', // 40px
    12: 'h-12 w-12', // 48px
    16: 'h-16 w-16', // 64px
  }[size];

  // 테두리 두께 클래스
  const borderClass = `border-${borderWidth}`;

  return (
    <div
      className={` ${sizeClass} animate-spin rounded-full ${borderClass} ${colorClasses[color]} border-t-transparent ${className} `}
      role="status"
      aria-label="loading"
    />
  );
}

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Pagination button component
 * @param children - 버튼 컨텐츠(아이콘, 텍스트 등)
 * @param onClick - 버튼 클릭 핸들러
 * @param className - 커스텀 클래스
 * @param disabled - 버튼 비활성화 여부
 */
export default function PaginationButton({
  children,
  onClick,
  className,
  disabled,
}: PaginationButtonProps) {
  return (
    <button
      className={`${className} dark:shadow-custom-dark flex h-[45px] w-[45px] items-center justify-center rounded-custom bg-background text-gray-400 shadow-custom`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

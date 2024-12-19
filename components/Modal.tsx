import Image from 'next/image';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean; // 모달 오픈 여부
  onClose: () => void; // 모달 닫기 함수
  children: React.ReactNode; // 모달 내용
  width?: string; // 모달 너비
}

/**
 * 모달 공통 레이아웃 컴포넌트
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기 함수
 * @param children 모달 내용
 * @param width 모달 너비
 * @returns Modal 컴포넌트
 */

const Modal = ({
  isOpen,
  onClose,
  children,
  width = 'w-11/12 ta:w-3/4 pc:w-1/2',
}: ModalProps) => {
  // esc 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 의존성을 추가하지 않는 이유: 초기 렌더링에서만 실행되도록 의도함

  // 모달이 닫혀있으면 null 반환
  if (!isOpen) return null;

  // 배경 클릭시 모달 닫기
  const handleBackGroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* 배경 클릭 이벤트를 처리할 버튼 */}
      <button
        className="absolute inset-0 cursor-default bg-black/50"
        onClick={handleBackGroundClick}
        aria-label="배경 클릭시 모달 닫기"
      />

      <div
        className={`${width} relative max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl`}
      >
        {/* 닫기 버튼 영역 */}
        <button
          className="absolute right-0 top-0 m-2 cursor-pointer"
          onClick={onClose}
          aria-label="모달 닫기"
        >
          <Image
            src="/icon/icon-close.svg"
            alt="닫기 아이콘"
            width={22}
            height={22}
          />
        </button>
        {/* 컨텐츠 영역 */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

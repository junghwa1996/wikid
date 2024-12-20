import Modal from './Modal';

interface ModalDefaultProps {
  title: string;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  closeOnBackgroundClick?: boolean;
}

/**
 * Default modal component
 * @param {string} title - 타이틀
 * @param {string} props.text - 텍스트
 * @param {boolean} props.isOpen - 모달 오픈 여부
 * @param {function} props.onClose - 모달 닫기 함수
 * @param {React.ReactNode} props.children - 모달 하단에 추가할 컴포넌트(예: 버튼)
 * @param {boolean} props.closeOnBackgroundClick - 배경 클릭 시 모달 닫기 여부
 */
export default function ModalDefault({
  title,
  text,
  children,
  isOpen,
  onClose,
  closeOnBackgroundClick,
}: ModalDefaultProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackgroundClick={closeOnBackgroundClick}
    >
      <div className="mb-[33px]">
        <p className="mb-[10px] text-18sb mo:text-16sb">{title}</p>
        <p className="text-16 text-gray-400 mo:text-14">{text}</p>
      </div>

      <div className="flex items-center justify-end gap-2">{children}</div>
    </Modal>
  );
}

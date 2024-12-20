import Modal from './Modal';

interface ModalDefaultProps {
  title: string;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  closeOnBackgroundClick?: boolean;
}

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

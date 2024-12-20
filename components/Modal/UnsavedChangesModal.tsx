import Button from '../Button';
import ModalDefault from './ModalDefault';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeAndNoSave: () => void;
}

function UnsavedChangesModal({
  isOpen,
  closeAndNoSave,
  onClose,
}: UnsavedChangesModalProps) {
  return (
    <ModalDefault
      title="저장하지 않고 나가시겠어요?"
      text="작성하신 모든 내용이 사라집니다."
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackgroundClick={false}
    >
      <Button onClick={closeAndNoSave} variant="danger">
        페이지 나가기
      </Button>
    </ModalDefault>
  );
}

export default UnsavedChangesModal;

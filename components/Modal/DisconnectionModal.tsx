import Button from '../Button';
import ModalDefault from './ModalDefault';

interface DisconnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmReset: () => void;
}

function DisconnectionModal({
  confirmReset,
  isOpen,
  onClose,
}: DisconnectionModalProps) {
  return (
    <ModalDefault
      title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
      text="위키 참여하기를 통해 다시 위키를 수정해 주세요."
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackgroundClick={true}
    >
      <Button onClick={confirmReset}>확인</Button>
    </ModalDefault>
  );
}

export default DisconnectionModal;

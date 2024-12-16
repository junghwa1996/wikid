import { useState } from 'react';

// import DisconnectionModal from '@/components/DisconnectionModal';
// import UnsavedChangesModal from '@/components/UnsavedChangesModal';
import ImageUploadModal from '@/components/ImageUploadModal';
import WikiQuizModal from '@/components/WikiQuizModal';

const QUESTION = '특별히 싫어하는 음식은?';
const ANSWER = '카레';

function disconnect() {
  // const [isDMOpen, setIsDMOpen] = useState(false);
  // const [isUCOpen, setIsUCOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  // const onUCClose = () => setIsUCOpen(false);
  // const onDMClose = () => setIsDMOpen(false);
  const onQuizClose = () => setIsQuizOpen(false);
  const onImageClose = () => setIsImageOpen(false);

  const handleQuizSuccess = () => {
    alert('퀴즈를 성공하셨습니다.');
    setIsQuizOpen(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* <button
        onClick={() => setIsDMOpen(true)}
        className="rounded-custom bg-green-200 px-6 py-2 text-background"
      >
        접속 끊김 확인
      </button>
      <button
        onClick={() => setIsUCOpen(true)}
        className="rounded-custom bg-red-100 px-6 py-2 text-background"
      >
        저장하지 않고 나가기
      </button> */}
      <button
        onClick={() => setIsQuizOpen(true)}
        className="rounded-custom bg-blue-200 px-6 py-2 text-background"
      >
        퀴즈 시작
      </button>
      <button
        onClick={() => setIsImageOpen(true)}
        className="rounded-custom bg-yellow-200 px-6 py-2 text-background"
      >
        이미지 업로드
      </button>
      {/* <DisconnectionModal isOpen={isDMOpen} onClose={onDMClose} />
      <UnsavedChangesModal isOpen={isUCOpen} onClose={onUCClose} /> */}
      <ImageUploadModal isOpen={isImageOpen} onClose={onImageClose} />
      <WikiQuizModal
        isOpen={isQuizOpen}
        onClose={onQuizClose}
        securityQuestion={QUESTION}
        securityAnswer={ANSWER}
        onQuizComplete={handleQuizSuccess}
      />
    </div>
  );
}

export default disconnect;

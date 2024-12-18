import { useState } from 'react';

import Button from '@/components/Button';
import WikiQuizModal from '@/components/WikiQuizModal';

interface BlankProps {
  onQuizSuccess: () => void;
  question: string;
  answer: string;
}

/**
 * 내 위키가 비어있을 때 띄우는 컴포넌트
 * @param onQuizSuccess 퀴즈 성공 후 호출되는 함수
 * @param question 퀴즈에 사용되는 질문
 * @param answer 퀴즈에 대한 답변
 */

export default function Blank({ onQuizSuccess, question, answer }: BlankProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const onQuizClose = () => setIsQuizOpen(false);

  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-3 rounded-xl bg-gray-100 text-gray-400">
      <div className="flex flex-col items-center">
        <div>아직 작성된 내용이 없네요. </div>
        <div>위키에 참여해 보세요!</div>
      </div>
      <Button onClick={() => setIsQuizOpen(true)}>시작하기</Button>

      <WikiQuizModal
        isOpen={isQuizOpen}
        onClose={onQuizClose}
        securityQuestion={question}
        securityAnswer={answer}
        onQuizComplete={() => {
          onQuizSuccess();
          onQuizClose();
        }}
      />
    </div>
  );
}

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Modal from './Modal';

interface WikiQuizModalProps {
  isOpen: boolean; // 모달 오픈 여부
  onClose: () => void; // 모달 닫기 함수
  securityQuestion: string; // from user.profile.code
  securityAnswer: string;
  onQuizComplete: () => void; // 퀴즈 완료 함수
}

interface WarningTextProps {
  warning: boolean;
}

const WarningText = ({ warning }: WarningTextProps) => {
  if (!warning) return null;
  return (
    <p className="text-xs text-red-500">정답이 아닙니다. 다시 입력해 주세요.</p>
  );
};

/**
 * 위키 퀴즈 모달 컴포넌트
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기 함수
 * @param securityQuestion 질문
 * @param securityAnswer 답변
 * @param onQuizComplete 퀴즈 완료 함수
 * @returns WikiQuizModal 컴포넌트
 */

const WikiQuizModal = ({
  isOpen,
  onClose,
  securityQuestion,
  securityAnswer,
  onQuizComplete,
}: WikiQuizModalProps) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [warning, setWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // 정답 타이핑 관리 함수
  const handleUserAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
    setWarning(false); // 타이핑시 경고문 제거
  };

  const handleQuizSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    try {
      if (!userAnswer) return;

      setIsSubmitting(true); // 제출 시 로딩 ui 표시
      // api 통신 로직
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 실제 통신 대신 시뮬레이션션
      // 정답이면
      // {
      //   "registeredAt": "2024-12-16T07:56:44.829Z",
      //   "userId": 1799
      // }
      // 오답이면
      // {
      //   "message": "보안 답변이 일치하지 않습니다."
      // }

      // 답변 비교 전에 trim()
      const cleanUserAnswer = userAnswer.trim();
      const cleanSecurityAnswer = securityAnswer?.trim() || '';
      if (cleanUserAnswer === cleanSecurityAnswer) {
        setIsCorrect(true);
        setWarning(false);
        onQuizComplete();
      } else {
        setWarning(true);
        setUserAnswer(''); // 오답시 입력값 초기화
        inputRef.current?.focus(); // 오답시 input에 포커스
      }
    } catch (error) {
      console.error('Quiz 제출 error:', error);
      alert('퀴즈 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false); // 제출 완료 시 로딩 종료
    }
  };

  useEffect(() => {
    // 모달 오픈시 input 포커스
    if (isOpen) {
      inputRef.current?.focus();
    }
    setIsCorrect(false); // 모달 오픈시 정답 초기화
    setUserAnswer(''); // 모달 오픈시 입력값 초기화
    setWarning(false); // 모달 오픈시 경고문 초기화
    setIsCorrect(false); // 모달 오픈시 정답 초기화
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleQuizSubmit} className="flex flex-col items-center">
        <Image
          src="/icon/icon-lock.png"
          alt="자물쇠 아이콘"
          width={20}
          height={20}
          priority
        />
        <p className="mt-2 text-sm">다음 퀴즈를 맞추고</p>
        <p className="text-sm">위키를 작성해 보세요.</p>
        <div className="mt-4 w-full text-left text-lg font-bold">
          {securityQuestion}
        </div>
        <input
          type="text"
          placeholder="답변을 입력해 주세요."
          ref={inputRef}
          onChange={handleUserAnswer}
          className={`mt-4 w-full rounded-lg focus:outline-none focus:ring-2 ${warning ? `bg-red-300 focus:ring-red-200` : `bg-gray-100 focus:ring-green-200`} p-2`}
        />
        <WarningText warning={warning} />
        <button
          type="submit"
          disabled={!userAnswer.trim() || isCorrect || isSubmitting}
          className={`mt-4 w-full rounded-custom px-6 py-2 text-background transition-colors ${
            !userAnswer.trim() || isCorrect || isSubmitting
              ? 'cursor-not-allowed bg-gray-200'
              : 'bg-green-200 hover:bg-green-300'
          }`}
        >
          {/* {isSubmitting ? '확인 중...' : '확인'} */}
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <span className="mr-2">확인 중</span>
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            '확인'
          )}
        </button>
      </form>
      <div className="mt-2 text-center">
        <p className="text-xs">위키드는 지인들과 함께하는 즐거운 공간입니다.</p>
        <p className="text-xs">지인에게 상처를 주지 않도록 작성해 주세요.</p>
      </div>
    </Modal>
  );
};

export default WikiQuizModal;

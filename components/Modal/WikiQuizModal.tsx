import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import InputField from '@/components/Input';
import useCheckMobile from '@/hooks/useCheckMobile';

import { useKeyboardVisibility } from '../../hooks/modal/useKeyboardVisibilty';
import { useWikiQuiz } from '../../hooks/modal/useQuiz';
import { WikiQuizModalProps } from '../../types/modal';
import Button from '../Button';
import Modal from './Modal';

export const QUIZ_MESSAGES = {
  ERROR: '잘못된 답변입니다. 다시 시도해주세요.',
  SUBMIT_ERROR: '퀴즈 제출 중 오류가 발생했습니다.',
  WIKI_DESCRIPTION: '위키드는 친구들과 함께 공유하는 즐거운 공간입니다.',
  WIKI_GUIDANCE: '작성 시 서로를 배려하고 존중해주세요.',
} as const;

function WikiQuizModal({
  isOpen,
  onClose,
  securityQuestion,
  userCode,
  onQuizComplete,
}: WikiQuizModalProps): React.ReactElement {
  const isMobile = useCheckMobile();

  // DOM 요소 참조
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const keyboardVisible = useKeyboardVisibility(inputRef, isMobile);

  const {
    state,
    errorMessage,
    handleSubmit,
    handleUserAnswer,
    setState,
    setErrorMessage,
  } = useWikiQuiz(onQuizComplete, userCode);

  // 모달 초기화
  useEffect(() => {
    if (isOpen) {
      setState({
        isCorrect: false,
        isSubmitting: false,
        userAnswer: '',
      });
      setErrorMessage(undefined);
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, setState, setErrorMessage]);

  // UI 렌더링
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackgroundClick={false}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`mb-5 flex flex-col gap-9 ${keyboardVisible ? '!gap-5' : ''}`}
      >
        <div
          className={`flex flex-col items-center gap-[10px] ${
            keyboardVisible ? 'flex-row justify-center' : ''
          }`}
        >
          <div
            className={`flex size-[42px] items-center justify-center rounded-full bg-background ${
              keyboardVisible ? '!size-auto' : ''
            }`}
          >
            <Image
              src="/icon/icon-lock.svg"
              alt="잠금 아이콘"
              width={20}
              height={20}
              priority
            />
          </div>
          <p className="text-center text-14 text-gray-400">
            위키에 작성하기 위해
            <br className={keyboardVisible ? 'mo:hidden' : ''} />
            아래 퀴즈에 답해주세요.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <p className="text-18b">{securityQuestion}</p>

          <InputField
            type="text"
            placeholder="답변을 입력하세요"
            ref={inputRef}
            value={state.userAnswer}
            onChange={handleUserAnswer}
            aria-invalid={errorMessage !== undefined}
            aria-describedby={
              errorMessage !== undefined ? 'error-message' : undefined
            }
          />

          {errorMessage !== undefined && (
            <p id="error-message" className="text-12 text-red-100">
              {errorMessage}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={state.userAnswer.trim().length === 0 || state.isCorrect}
          isLoading={state.isSubmitting}
          size="small"
          className="w-full"
        >
          제출
        </Button>
      </form>

      {!keyboardVisible && (
        <div className="mt-2 px-4 text-center text-12 text-gray-400">
          <p>{QUIZ_MESSAGES.WIKI_DESCRIPTION}</p>
          <p>{QUIZ_MESSAGES.WIKI_GUIDANCE}</p>
        </div>
      )}
    </Modal>
  );
}

export default WikiQuizModal;

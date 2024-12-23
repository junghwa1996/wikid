import Image from 'next/image';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

import InputField from '@/components/Input';
import useCheckMobile from '@/hooks/useCheckMobile';
import instance from '@/lib/axios-client';

import Button from '../Button';
import Modal from './Modal';

// 위키 퀴즈 모달 컴포넌트의 props 타입 정의
interface WikiQuizModalProps {
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 모달 닫기 핸들러
  securityQuestion: string; // 보안 질문 내용
  userCode: string; // 사용자 코드
  onQuizComplete: () => void; // 퀴즈 완료 시 실행될 콜백
}

// 퀴즈 상태 관리를 위한 인터페이스
interface QuizState {
  isCorrect: boolean; // 정답 여부
  isSubmitting: boolean; // 제출 중 상태
  userAnswer: string; // 사용자 입력 답변
}

// 퀴즈 응답 데이터 인터페이스
interface QuizResponse {
  registeredAt: string; // 등록 시간
  userId: string; // 사용자 ID
  success: boolean; // 성공 여부
}

function WikiQuizModal({
  isOpen,
  onClose,
  securityQuestion,
  userCode,
  onQuizComplete,
}: WikiQuizModalProps): React.ReactElement {
  // 퀴즈 상태 관리
  const [state, setState] = useState<QuizState>({
    isCorrect: false,
    isSubmitting: false,
    userAnswer: '',
  });

  const isMobile = useCheckMobile();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // DOM 요소 참조
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 모바일 키보드 가시성 감지 및 처리
  useEffect(() => {
    if (!isMobile) return undefined;

    const handleKeyboardVisibility = (): void => {
      const isKeyboardVisible = window.innerHeight < window.screen.height;
      setKeyboardVisible(isKeyboardVisible);

      // 키보드가 보일 때 입력 필드로 포커스 및 스크롤
      if (isKeyboardVisible && inputRef.current !== null) {
        inputRef.current.focus();
        void setTimeout(() => {
          if (inputRef.current !== null) {
            inputRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 100);
      }
    };

    handleKeyboardVisibility();
    window.addEventListener('resize', handleKeyboardVisibility);
    return () => {
      window.removeEventListener('resize', handleKeyboardVisibility);
    };
  }, [isMobile]);

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
  }, [isOpen]);

  // 사용자 입력 처리
  const handleUserAnswer = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setState((prev) => ({
      ...prev,
      userAnswer: value,
    }));
    setErrorMessage(undefined);
  };

  // 퀴즈 답변 제출 API 호출
  const submitQuizAnswer = async (answer: string): Promise<QuizResponse> => {
    try {
      const response = await instance.post<QuizResponse>(
        `/profiles/${userCode}/ping`,
        {
          securityAnswer: answer,
        }
      );

      return {
        registeredAt: response.data.registeredAt,
        userId: response.data.userId,
        success: true,
      };
    } catch (error) {
      console.error('퀴즈 제출 오류:', error);
      return { registeredAt: '', userId: '', success: false };
    }
  };

  // 퀴즈 제출 핸들러
  const handleQuizSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { userAnswer } = state;
    if (userAnswer.length === 0) return;

    try {
      setState((prev) => ({ ...prev, isSubmitting: true }));

      const result = await submitQuizAnswer(userAnswer);

      // 결과 처리
      if (result.success) {
        setState((prev) => ({ ...prev, isCorrect: true }));
        onQuizComplete();
      } else {
        setState((prev) => ({ ...prev, userAnswer: '' }));
        setErrorMessage('잘못된 답변입니다. 다시 시도해주세요.');
        if (inputRef.current !== null) {
          inputRef.current.focus();
        }
      }
    } catch (error) {
      console.error('퀴즈 제출 오류:', error);
      window.alert('퀴즈 제출 중 오류가 발생했습니다.');
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // UI 렌더링
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackgroundClick={false}>
      <form
        ref={formRef}
        onSubmit={handleQuizSubmit}
        className={`mb-5 flex flex-col gap-9 ${keyboardVisible ? '!gap-5' : ''}`}
      >
        <div
          className={`flex flex-col items-center gap-[10px] ${
            keyboardVisible ? '!flex-row justify-center' : ''
          }`}
        >
          <div
            className={`flex size-[42px] items-center justify-center rounded-full bg-white ${
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
          <p>위키드는 친구들과 함께 공유하는 즐거운 공간입니다.</p>
          <p>작성 시 서로를 배려하고 존중해주세요.</p>
        </div>
      )}
    </Modal>
  );
}

export default WikiQuizModal;

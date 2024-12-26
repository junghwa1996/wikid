import axios from 'axios';
import React, { useState } from 'react';

import { QUIZ_MESSAGES } from '../../components/Modal/WikiQuizModal';
import instance from '../../lib/axios-client';
import { QuizResponse, QuizState } from '../../types/modal';

export function useWikiQuiz(onQuizComplete: () => void, userCode: string) {
  const [state, setState] = useState<QuizState>({
    isCorrect: false,
    isSubmitting: false,
    userAnswer: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

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
      // axios 에러인지 확인
      if (axios.isAxiosError(error)) {
        // 400 에러는 틀린 답변을 의미
        if (error.response?.status === 400) {
          return {
            registeredAt: '',
            userId: '',
            success: false,
          };
        }
      }
      // 그 외 에러는 네트워크 문제 등
      console.error('퀴즈 제출 오류:', error);
      throw error; // 다시 throw하여 handleSubmit에서 처리
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (state.userAnswer.length === 0) return;

    try {
      setState((prev) => ({ ...prev, isSubmitting: true }));
      const result = await submitQuizAnswer(state.userAnswer);

      if (result.success) {
        setState((prev) => ({ ...prev, isCorrect: true }));
        onQuizComplete();
      } else {
        // 틀린 답변 처리
        setState((prev) => ({ ...prev, userAnswer: '' }));
        setErrorMessage(QUIZ_MESSAGES.ERROR);
      }
    } catch (error) {
      // 네트워크 에러 등 실제 에러 처리
      console.error('퀴즈 제출 오류:', error);
      window.alert(QUIZ_MESSAGES.SUBMIT_ERROR);
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // 사용자 입력 처리
  const handleUserAnswer = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prev) => ({
      ...prev,
      userAnswer: e.target.value,
    }));
    setErrorMessage(undefined);
  };

  return {
    state,
    errorMessage,
    handleSubmit,
    handleUserAnswer,
    setState,
    setErrorMessage,
  };
}

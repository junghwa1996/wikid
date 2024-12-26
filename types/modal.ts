export interface WikiQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  securityQuestion: string;
  userCode: string;
  onQuizComplete: () => void;
}

export interface QuizState {
  isCorrect: boolean;
  isSubmitting: boolean;
  userAnswer: string;
}

export interface QuizResponse {
  registeredAt: string;
  userId: string;
  success: boolean;
}

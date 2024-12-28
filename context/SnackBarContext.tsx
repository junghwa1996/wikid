import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import SnackBar, { SnackBarProps } from '@/components/SnackBar';

interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    severity?: SnackBarProps['severity'],
    autoHideDuration?: number
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: SnackBarProps['severity'];
    autoHideDuration?: number;
  }>({
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 2000,
  });

  /**
   * 스낵바를 띄웁니다.
   * @param message 메시지
   * @param severity 알림 종류
   * @param autoHideDuration 자동 숨김 시간
   */
  const showSnackbar = useCallback(
    (
      message: string,
      severity: SnackBarProps['severity'] = 'info',
      autoHideDuration = 2000
    ) => {
      setSnackbarState({
        open: true,
        message,
        severity,
        autoHideDuration,
      });
    },
    []
  );

  const handleClose = () => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackBar
        open={snackbarState.open}
        onClose={handleClose}
        severity={snackbarState.severity}
        autoHideDuration={snackbarState.autoHideDuration}
      >
        {snackbarState.message}
      </SnackBar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      'useSnackbar는 SnackbarProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};

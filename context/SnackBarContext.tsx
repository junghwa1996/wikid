import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
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
  const [queue, setQueue] = useState<
    {
      message: string;
      severity: SnackBarProps['severity'];
      autoHideDuration?: number;
    }[]
  >([]);
  const [currentSnackbar, setCurrentSnackbar] = useState<{
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
      setQueue((prev) => [...prev, { message, severity, autoHideDuration }]);
    },
    []
  );

  const handleClose = useCallback(() => {
    setCurrentSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    // 현재 스낵바가 닫히고 대기열에 항목이 남아 있다면 다음 스낵바를 표시
    if (!currentSnackbar.open && queue.length > 0) {
      const [nextSnackbar, ...remainingQueue] = queue;
      setQueue(remainingQueue);
      if (nextSnackbar) {
        setCurrentSnackbar({
          ...nextSnackbar,
          message: nextSnackbar.message || '',
          severity: nextSnackbar.severity || 'info',
          open: true,
        });
      }
    }
  }, [queue, currentSnackbar.open]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackBar
        open={currentSnackbar.open}
        onClose={handleClose}
        severity={currentSnackbar.severity}
        autoHideDuration={currentSnackbar.autoHideDuration}
      >
        {currentSnackbar.message}
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

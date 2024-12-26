import { useState } from 'react';
import type { SnackBarProps } from '@/components/SnackBar';

// 스낵바 타입 정의
type severityType = 'fail' | 'success' | 'info';

export default function useSnackBar() {
  const [snackBarValues, setSnackBarValues] = useState<SnackBarProps>({
    severity: 'success',
    children: '',
    open: false,
    onClose: () => {},
    autoHideDuration: 3000,
  });

  // 스낵바 오픈 함수
  const snackBarOpen = (
    severity: severityType,
    children: string,
    done: null | (() => void) = null, // 스넥바 사라지고 난 후 실행할 함수
    autoHideDuration: number = 3000
  ) => {
    setSnackBarValues({
      open: true,
      severity,
      children,
      onClose: () => {
        setSnackBarValues({ ...snackBarValues, open: false });
        if (done) done();
      },
      autoHideDuration,
    });
  };

  return { snackBarValues, snackBarOpen };
}

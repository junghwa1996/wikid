import { useState } from 'react';

import LinkBar from '@/components/LinkBar';
import SnackBar from '@/components/SnackBar';

interface ContentHeaderProps {
  name: string;
  link: string;
  isEditing: boolean;
  isInfoSnackBarOpen: boolean;
}

/**
 * Content 컴포넌트의 헤더에 해당하는 컴포넌트
 * @param name 위키문서의 이름
 * @param link 위키문서의 링크
 * @param onNameChange 이름이 변경될 때 호출되는 콜백 함수
 * @param isEditing 편집 모드인지 여부
 */

export default function ContentHeader({
  name,
  link,
  isEditing,
  isInfoSnackBarOpen,
}: ContentHeaderProps) {
  const [linkSnackBarState, setLinkSnackBarState] = useState<{
    open: boolean;
    severity: 'fail' | 'success' | 'info';
    message: string;
    autoHideDuration?: number;
  }>({
    open: false,
    severity: 'success',
    message: '',
  });

  const [infoSnackBarState, setInfoSnackBarState] = useState<{
    open: boolean;
    severity: 'fail' | 'success' | 'info';
    message: string;
    autoHideDuration?: number;
  }>({
    open: true,
    severity: 'info',
    message: '앞 사람의 편집이 끝나면 위키 참여가 가능합니다.',
    autoHideDuration: 300000,
  });

  const handleLinkClick = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setLinkSnackBarState({
          open: true,
          severity: 'success',
          message: '클립보드에 복사되었습니다.',
          autoHideDuration: 1500,
        });
      })
      .catch(() => {
        alert('링크 복사에 실패했습니다.');
      });
  };

  const handleCloseLinkSnackBar = () => {
    setLinkSnackBarState({
      ...linkSnackBarState,
      open: false,
    });
  };

  const handleCloseInfoSnackBar = () => {
    setInfoSnackBarState({
      ...infoSnackBarState,
      open: false,
    });
  };

  return (
    <div>
      <div className="mb-[32px] flex items-center justify-between text-48sb text-gray-500 mo:mb-[24px] mo:text-32sb">
        {name}
      </div>
      {!isEditing && <LinkBar link={link} onClick={handleLinkClick} />}
      {isInfoSnackBarOpen && (
        <SnackBar
          severity={infoSnackBarState.severity}
          open={infoSnackBarState.open}
          onClose={handleCloseInfoSnackBar}
          autoHideDuration={infoSnackBarState.autoHideDuration}
        >
          {infoSnackBarState.message}
        </SnackBar>
      )}

      {
        <SnackBar
          severity={linkSnackBarState.severity}
          open={linkSnackBarState.open}
          onClose={handleCloseLinkSnackBar}
          autoHideDuration={linkSnackBarState.autoHideDuration}
        >
          {linkSnackBarState.message}
        </SnackBar>
      }
    </div>
  );
}

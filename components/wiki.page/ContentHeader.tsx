import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import LinkBar from '@/components/LinkBar';
import UnsavedChangesModal from '@/components/Modal/UnsavedChangesModal';
import SnackBar from '@/components/SnackBar';
import { useSnackbar } from 'context/SnackBarContext';

interface ContentHeaderProps {
  name: string;
  link: string;
  isEditing: boolean;
  isInfoSnackBarOpen: boolean;
  isEmpty: boolean;
  diffTime?: number;
  handleQuizOpen: () => void;
  closeAndNoSave: () => void;
  saveContent: () => void;
}

/**
 * Content 컴포넌트의 헤더에 해당하는 컴포넌트
 * @param name 위키문서의 이름
 * @param link 위키문서의 링크
 * @param isEditing 편집모드인지 여부
 * @param isInfoSnackBarOpen 정보 스낵바의 열림 여부
 * @param isEmpty 위키문서가 비어있는지 여부
 * @param handleQuizOpen 퀴즈 모달을 열기 위한 함수
 * @param closeAndNoSave 편집모드에서 저장하지 않고 닫기 위한 함수
 * @param saveContent 편집모드에서 저장하기 위한 함수
 */

export default function ContentHeader({
  name,
  link,
  isEditing,
  isInfoSnackBarOpen,
  handleQuizOpen,
  isEmpty,
  diffTime,
  closeAndNoSave,
  saveContent,
}: ContentHeaderProps) {
  const [isUCOpen, setIsUCOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [infoSnackBarState, setInfoSnackBarState] = useState<{
    open: boolean;
    severity: 'fail' | 'success' | 'info';
    message: string;
    autoHideDuration?: number;
  }>({
    open: true,
    severity: 'info',
    message: '',
    autoHideDuration: 300000,
  });

  useEffect(() => {
    const infoSnackBarMessage = diffTime
      ? `${Math.floor(5 - diffTime / 60 / 1000)}분 후 위키 참여가 가능합니다.`
      : '';

    setInfoSnackBarState((prevState) => ({
      ...prevState,
      message: infoSnackBarMessage,
    }));
  }, [diffTime]);

  const onUCClose = () => {
    setIsUCOpen(false);
  };

  const handleCloseAndNoSave = () => {
    setIsUCOpen(false);
    closeAndNoSave();
  };

  const handleLinkClick = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        showSnackbar('클립보드에 복사되었습니다.', 'success');
      })
      .catch(() => {
        alert('링크 복사에 실패했습니다.');
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
      <div className="flex justify-between">
        <div className="mb-[32px] flex items-center justify-between text-48sb text-gray-500 mo:mb-[24px] mo:text-32sb">
          {name}
        </div>
        <div>
          {!isEditing ? (
            !isEmpty && <Button onClick={handleQuizOpen}>위키 수정하기</Button>
          ) : (
            <div className="flex gap-[5px] justify-self-end">
              <Button variant="secondary" onClick={() => setIsUCOpen(true)}>
                취소
              </Button>
              <UnsavedChangesModal
                isOpen={isUCOpen}
                closeAndNoSave={handleCloseAndNoSave}
                onClose={onUCClose}
              />
              <Button onClick={saveContent}>저장</Button>
            </div>
          )}
        </div>
      </div>
      {!isEditing && (
        <LinkBar link={link.slice(0, 43)} onClick={handleLinkClick} />
      )}
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
    </div>
  );
}

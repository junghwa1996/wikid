import { useEffect, useRef, useState } from 'react';
import NotificationBox from '../Notification/NorificationBox';
import instance from '@/lib/axios-client';
import { useSnackbar } from 'context/SnackBarContext';
import useOutsideClick from '@/hooks/useOutsideClick';
import useCheckMobile from '@/hooks/useCheckMobile';

export interface NotificationProps {
  totalCount: number;
  list: {
    createdAt: Date;
    content: string;
    id: number;
  }[];
}

interface NotificationWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationWrapper({
  isOpen,
  onClose,
}: NotificationWrapperProps) {
  const [notification, setNotification] = useState<
    NotificationProps | undefined
  >();
  const { showSnackbar } = useSnackbar();
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useCheckMobile();

  // 모바일일 때만 useOutsideClick 훅을 적용
  useOutsideClick(isMobile ? notificationRef : { current: null }, onClose);

  useEffect(() => {
    const getNotification = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const noti = await instance.get('/notifications?pages=1&pageSize=99', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setNotification(noti.data);
      } catch {
        showSnackbar('오류가 발생했습니다', 'fail');
      }
    };

    if (isOpen) {
      getNotification();
    }
  }, [isOpen, showSnackbar]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative" ref={notificationRef}>
      <NotificationBox
        onClose={onClose}
        content={notification}
        setNotification={setNotification}
      />
    </div>
  );
}

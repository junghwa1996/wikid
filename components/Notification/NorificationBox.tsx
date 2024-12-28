import Image from 'next/image';
import NotificationContents from './NotificationContents';
import { NotificationProps } from '../Notification/NotificationWrapper';
import instance from '@/lib/axios-client';
import { useSnackbar } from 'context/SnackBarContext';

interface NotificationBoxProps {
  onClose: () => void;
  content: NotificationProps | undefined;
  setNotification: (notification: NotificationProps) => void;
}

export default function NotificationBox({
  onClose,
  content,
  setNotification,
}: NotificationBoxProps) {
  const { showSnackbar } = useSnackbar();
  const handleNotiContent = async (id: number) => {
    try {
      await instance.delete(`/notifications/${id}`);

      if (content?.list) {
        const updatedList = content.list.filter(
          (notification) => notification.id !== id
        );

        setNotification({
          totalCount: updatedList.length,
          list: updatedList,
        });
      }
    } catch (error) {
      showSnackbar('오류가 발생했습니다', 'fail');
    }
  };

  return (
    <div className="alarmDownFadein absolute right-0 z-20 mt-[8px] flex max-h-[293px] w-[368px] flex-col gap-[16px] rounded-custom bg-gray-200 px-[20px] py-[24px] shadow-custom dark:shadow-custom-dark mo:top-[30px] mo:w-[250px]">
      <div className="flex items-center justify-between">
        <div className="text-20b">알림 {content?.totalCount}개</div>
        <button onClick={onClose}>
          <Image
            src="/icon/icon-close.svg"
            alt="닫기 버튼"
            width={24}
            height={24}
            className="brightness-0"
          />
        </button>
      </div>
      <div
        className={`flex flex-col gap-[8px] overflow-y-auto [&::-webkit-scrollbar]:hidden`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {content?.list && content.list.length > 0 ? (
          content.list.map((notification) => (
            <NotificationContents
              key={notification.id}
              createdAt={notification.createdAt}
              handleNotiContent={() => handleNotiContent(notification.id)}
              onClose={onClose}
            />
          ))
        ) : (
          <div className="flex h-[100px] items-center justify-center text-14 text-gray-400">
            최근 알림이 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

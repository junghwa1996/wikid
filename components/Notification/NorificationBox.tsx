import Image from 'next/image';
import NotificationContents from './NotificationContents';
import { NotificationProps } from '../Notification/NotificationWrapper';
import instance from '@/lib/axios-client';

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
  const handleNotiContent = async (id: number) => {
    try {
      // 삭제 요청 보내기 (id 기반)
      await instance.delete(`/notifications/${id}`);

      // content.list에서 삭제된 알림 항목을 제외한 새 배열로 업데이트
      if (content?.list) {
        const updatedList = content.list.filter(
          (notification) => notification.id !== id
        );

        // 상태 업데이트 (list에서 해당 알림을 제외)
        setNotification({
          totalCount: updatedList.length,
          list: updatedList,
        });
      }
    } catch (error) {
      console.error('알림 삭제 중 오류 발생', error);
    }
  };

  return (
    <div className="absolute right-0 z-20 flex max-h-[293px] w-[368px] flex-col gap-[16px] rounded-custom bg-gray-200 px-[24px] py-[20px] mo:top-[30px] mo:w-[250px]">
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
              onClose={() => handleNotiContent(notification.id)}
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

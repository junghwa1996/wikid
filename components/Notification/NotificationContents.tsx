import { useProfileContext } from '@/hooks/useProfileContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface NotificationContentsProps {
  createdAt: Date;
  onClose: () => void;
}

export default function NotificationContents({
  createdAt,
  onClose,
}: NotificationContentsProps) {
  const { profile } = useProfileContext();
  const router = useRouter();

  const now = new Date();

  const timeDifference = now.getTime() - new Date(createdAt).getTime();

  const minutes = Math.floor(timeDifference / 1000 / 60);
  const hours = Math.floor(timeDifference / 1000 / 60 / 60);
  const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

  let timeAgo = '';
  if (days > 0) {
    timeAgo = `${days}일 전`;
  } else if (hours > 0) {
    timeAgo = `${hours}시간 전`;
  } else if (minutes > 0) {
    timeAgo = `${minutes}분 전`;
  } else {
    timeAgo = '방금';
  }

  const handleLinkClick = async () => {
    const url = `/wiki/${profile?.code}`;
    await router.replace(url);
    onClose();
  };

  return (
    <button
      onClick={handleLinkClick}
      className="flex w-full flex-col gap-[4px] rounded-custom bg-background px-[16px] py-[12px] dark:bg-gray-100"
    >
      <div>
        <div className="flex w-full items-center justify-between">
          <div className="size-[5px] rounded-full bg-red-100"></div>
          <button onClick={onClose}>
            <Image
              src="/icon/icon-close.svg"
              alt="닫기 버튼"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="w-[288px] text-left text-14 mo:w-[172px]">
          내 위키가 수정되었습니다.
        </div>
      </div>
      <div className="text-12 text-gray-400">{timeAgo}</div>
    </button>
  );
}

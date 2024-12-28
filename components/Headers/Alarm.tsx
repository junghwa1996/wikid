import Image from 'next/image';
import { useState } from 'react';
import NotificationWrapper from '@/components/Notification/NotificationWrapper';

interface AlarmProps {
  isLoggedIn: boolean;
}

export default function Alarm({ isLoggedIn }: AlarmProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleAlarmOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };
  const handleAlarmClose = () => setIsOpen(false);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative">
      <button onClick={handleAlarmOpen}>
        <Image
          src="/icon/icon-alarm.svg"
          className="mo:hidden"
          alt="알림 아이콘"
          width={32}
          height={32}
        />
      </button>

      <NotificationWrapper isOpen={isOpen} onClose={handleAlarmClose} />
    </div>
  );
}

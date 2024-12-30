import Image from 'next/image';
import { useRef, useState } from 'react';
import NotificationWrapper from '@/components/Notification/NotificationWrapper';
import useOutsideClick from '@/hooks/useOutsideClick';

interface AlarmProps {
  isLoggedIn: boolean;
}

export default function Alarm({ isLoggedIn }: AlarmProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleAlarmOpen = () => setIsOpen(!isOpen);
  const handleAlarmClose = () => setIsOpen(false);
  const alarmRef = useRef<HTMLDivElement>(null);

  useOutsideClick(alarmRef, () => setIsOpen(false));

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div ref={alarmRef}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleAlarmOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleAlarmOpen();
        }}
        className={`hover:brightness-75 active:brightness-50 ${isOpen ? 'brightness-50' : ''}`}
      >
        <Image
          src="/icon/icon-alarm.svg"
          className="mo:hidden"
          alt="알림 아이콘"
          width={32}
          height={32}
        />
      </div>

      {isOpen && (
        <NotificationWrapper isOpen={isOpen} onClose={handleAlarmClose} />
      )}
    </div>
  );
}

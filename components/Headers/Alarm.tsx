import Image from 'next/image';

interface AlarmProps {
  isLoggedIn: boolean;
}

/**
 * 알림 컴포넌트
 * @param isLoggedIn 로그인 여부 판별
 */

export default function Alarm({ isLoggedIn }: AlarmProps) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <button>
      <Image
        src="/icon/icon-alarm.svg"
        className="mo:hidden"
        alt="알림 아이콘"
        width={32}
        height={32}
      />
    </button>
  );
}

import useCheckMobile from 'hooks/useCheckMobile';
import Image from 'next/image';
import Link from 'next/link';

import { useProfileContext } from '../../hooks/useProfileContext';
import Alarm from './Alarm';
import GNB from './GNB';
import Login from './Login';
import DarkModeToggle from '@/components/DarkmodeToggle';

export default function Headers() {
  const { isAuthenticated, profile } = useProfileContext();
  const isMobile = useCheckMobile();

  return (
    <header className="fixed left-0 top-0 z-10 flex w-full items-center justify-between bg-background py-5 shadow-custom pc:h-[80px] pc:px-[80px] tamo:h-[60px] tamo:px-[20px]">
      <div className="flex gap-10">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="위키드 로고"
            width={107}
            height={30}
            priority
          />
        </Link>
        <GNB />
      </div>
      {/* 로그인 여부에 따라 조건부로 노출 */}
      <div className="flex items-center gap-5 mo:gap-2">
        <DarkModeToggle />
        <Alarm isLoggedIn={isAuthenticated} />
        <Login
          isMobile={isMobile}
          isLoggedIn={isAuthenticated}
          profile={profile}
        />
      </div>
    </header>
  );
}

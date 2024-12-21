import useCheckMobile from 'hooks/useCheckMobile';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/utils/AuthContext';

import Alarm from './Alarm';
import GNB from './GNB';
import Login from './Login';

export default function Headers() {
  // TODO 임시 로그인 상태(추후 업데이트예정)
  const { isAuthenticated } = useAuth();
  const isMobile = useCheckMobile();

  return (
    <header className="fixed left-0 top-0 z-10 flex w-full items-center justify-between bg-background py-5 shadow-custom mo:h-[60px] mo:px-8 ta:h-[60px] ta:px-[20px] pc:h-[80px] pc:px-[80px]">
      <div className="flex gap-10">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="위키드 로고"
            width={107}
            height={30}
          />
        </Link>
        <GNB />
      </div>
      {/* 로그인 여부에 따라 조건부로 노출 */}
      <div className="flex items-center gap-5">
        <Alarm isLoggedIn={isAuthenticated} />
        <Login isMobile={isMobile} isLoggedIn={isAuthenticated} />
      </div>
    </header>
  );
}

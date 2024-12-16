import Link from 'next/link';
import { useEffect, useState } from 'react';

import Alarm from './Alarm';
import GNB from './GNB';
import Login from './Login';

export default function Headers() {
  // TODO 임시 로그인 상태(추후 업데이트예정)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <header className="z-100 fixed left-0 top-0 flex h-20 w-full items-center justify-between bg-background px-20 py-5 shadow-custom">
      <div className="flex gap-10">
        <Link href="/">
          <img src="/logo.svg" alt="위키드 로고" />
        </Link>
        <GNB />
      </div>
      {/* 로그인 여부에 따라 조건부로 노출 */}
      <div className="flex items-center gap-5">
        <Alarm isLoggedIn={isLoggedIn} />
        <Login
          login={handleLogin}
          logout={handleLogout}
          isMobile={isMobile}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  );
}

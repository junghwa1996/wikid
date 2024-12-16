import { useEffect, useRef, useState } from 'react';

import Header from './Header';
import Login from './Login';
import Alarm from './Alarm';
import ProfileIcon from './ProfileIcon';

export default function GNB() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ANCHOR TODO
  const [isMobile, setIsMobile] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={profileMenuRef}
      className="z-100 fixed left-0 top-0 flex h-20 w-full items-center justify-between bg-background px-20 py-5 shadow-custom"
    >
      <Header />

      {isLoggedIn ? (
        <div className="flex items-center gap-5">
          <Alarm />
          <ProfileIcon isMobile={isMobile} logout={handleLogout} />
        </div>
      ) : (
        <Login login={handleLogin} isMobile={isMobile} />
      )}
    </div>
  );
}

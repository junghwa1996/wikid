import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import Menu from './Menu';
import useOutsideClick from '../hooks/useOutsideClick';

export default function GNB() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 임시 로그인 상태(추후 업데이트예정)
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileMenu, setProfileMenu] = useState<string[]>([]);
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleProfileMenu = (option: string) => {
    if (option === '위키목록') {
      router.push('/wikilist');
    } else if (option === '자유게시판') {
      router.push('/boards');
    } else if (option === '마이페이지') {
      router.push('/mypage');
    } else if (option === '로그인') {
      handleLogin(); // 추후 업데이트 예정
    } else if (option === '로그아웃') {
      handleLogout();
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const updateProfileMenu = () => {
    if (!isLoggedIn && isMobile) {
      return ['로그인', '위키목록', '자유게시판'];
    }
    if (isLoggedIn && !isMobile) {
      return ['마이페이지', '로그아웃'];
    }
    if (isLoggedIn && isMobile) {
      return ['위키목록', '자유게시판', '알림', '마이페이지', '로그아웃'];
    }
    return [];
  };

  useEffect(() => {
    setProfileMenu(updateProfileMenu());
  }, [isLoggedIn, isMobile]);

  useOutsideClick(profileMenuRef, () => setIsOpen(false));

  return (
    <div
      ref={profileMenuRef}
      className="z-100 fixed left-0 top-0 flex h-20 w-full items-center justify-between bg-background px-20 py-5 shadow-custom"
    >
      <div className="flex items-center gap-10">
        <button onClick={() => router.push('/')}>
          <img src="/logo.svg" alt="위키드 로고" />
        </button>
        <button className="mo:hidden" onClick={() => router.push('/wikilist')}>
          위키목록
        </button>
        <button className="mo:hidden" onClick={() => router.push('/boards')}>
          자유게시판
        </button>
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-5">
          {!isMobile && (
            <button>
              <img src="/icon/icon-alarm.svg" alt="알림 아이콘" />
            </button>
          )}
          <button className="relative" onClick={() => setIsOpen(!isOpen)}>
            <img
              src="/icon/icon-profile.svg"
              className="mo:hidden"
              alt="프로필 아이콘"
            />
            <img
              src="/icon/icon-menu.svg"
              className="hidden mo:block"
              alt="메뉴 아이콘"
            />

            {isOpen && (
              <Menu
                options={profileMenu}
                onSelect={handleProfileMenu}
                menuSize="w-28"
              />
            )}
          </button>
        </div>
      ) : (
        <>
          {isMobile ? (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative hidden mo:block"
            >
              <img src="/icon/icon-menu.svg" alt="메뉴 아이콘" />

              {isOpen && (
                <Menu
                  options={profileMenu}
                  onSelect={handleProfileMenu}
                  menuSize="w-28"
                />
              )}
            </button>
          ) : (
            <button onClick={handleLogin} className="mo:hidden">
              로그인
            </button> // 추후 업데이트 예정
          )}
        </>
      )}
    </div>
  );
}

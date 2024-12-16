import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

import Menu from '../Menu';
import useOutsideClick from 'hooks/useOutsideClick';

interface ProfileIconProps {
  logout: () => void;
  isMobile: boolean;
}

/**
 * 프로필아이콘 컴포넌트
 * @param logout 로그아웃처리를 위한 함수
 * @param isMobile 화면 크기에 따라 모바일 여부 판별
 */

export default function ProfileIcon({ isMobile, logout }: ProfileIconProps) {
  const profileImage = null; //ANCHOR
  const [profileMenu, setProfileMenu] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const updateProfileMenu = () => {
    if (!isMobile) {
      return ['마이페이지', '로그아웃'];
    } else if (isMobile) {
      return ['위키목록', '자유게시판', '알림', '마이페이지', '로그아웃'];
    } else return [];
  };

  useEffect(() => {
    setProfileMenu(updateProfileMenu());
  }, [isMobile]);

  const handleProfileMenu = (option: string) => {
    if (option === '위키목록') {
      router.push('/wikilist');
    } else if (option === '자유게시판') {
      router.push('/boards');
    } else if (option === '마이페이지') {
      router.push('/mypage');
    } else if (option === '로그아웃') {
      logout();
    }
  };

  useOutsideClick(profileMenuRef, () => setIsOpen(false));

  return (
    <div ref={profileMenuRef} className="flex items-center">
      <button className="relative" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={profileImage || '/icon/icon-profile.svg'} //ANCHOR
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
  );
}

import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

import Menu from '../Menu';

import useOutsideClick from 'hooks/useOutsideClick';

interface LoginProps {
  login: () => void;
  isMobile: boolean;
}

export default function Login({ login, isMobile }: LoginProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenu = ['로그인', '위키목록', '자유게시판'];
  const router = useRouter();
  const loginMenuRef = useRef<HTMLDivElement>(null);

  const handleLoginMenu = (option: string) => {
    if (option === '위키목록') {
      router.push('/wikilist');
    } else if (option === '자유게시판') {
      router.push('/boards');
    } else if (option === '로그인') {
      login();
    }
  };

  useOutsideClick(loginMenuRef, () => setIsOpen(false));

  return isMobile ? (
    <div ref={loginMenuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative hidden mo:block"
      >
        <img src="/icon/icon-menu.svg" alt="메뉴 아이콘" />

        {isOpen && (
          <Menu
            options={mobileMenu}
            onSelect={handleLoginMenu}
            menuSize="w-28"
          />
        )}
      </button>
    </div>
  ) : (
    <button onClick={login} className="mo:hidden">
      로그인
    </button>
  );
}

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  return (
    <button
      className="rounded-full p-2 hover:bg-gray-200"
      onClick={() => setIsDarkMode((prev) => !prev)}
    >
      <Image
        src={isDarkMode ? 'icon/icon-light.svg' : 'icon/icon-dark.svg'}
        width={24}
        height={24}
        alt="다크 모드 전환"
      />
    </button>
  );
}

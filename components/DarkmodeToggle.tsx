import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="rounded p-2"
      style={{
        backgroundColor: 'var(--gray-200)',
        color: 'var(--gray-600)',
      }}
    >
      {isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
    </button>
  );
}

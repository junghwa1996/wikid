import type { AppProps } from 'next/app';

// TODO - 나중에 주석 풀어야 함
// import DarkModeToggle from '@/components/DarkmodeToggle';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <DarkModeToggle /> */}
      <Component {...pageProps} />
    </>
  );
}

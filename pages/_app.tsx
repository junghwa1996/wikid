import type { AppProps } from 'next/app';
import DarkModeToggle from '@/components/DarkmodeToggle';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DarkModeToggle />
      <Component {...pageProps} />
    </>
  );
}

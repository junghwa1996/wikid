import DarkModeToggle from '@/components/darkmodeToggle';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DarkModeToggle />
      <Component {...pageProps} />
    </>
  );
}

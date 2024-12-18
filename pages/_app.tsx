import type { AppProps } from 'next/app';

import DarkModeToggle from '@/components/DarkmodeToggle';
import Headers from '@/components/Headers/Headers';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DarkModeToggle />
      <Headers />
      <Component {...pageProps} />
    </>
  );
}

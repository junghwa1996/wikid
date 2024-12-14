import type { AppProps } from 'next/app';

import DarkModeToggle from '@/components/DarkmodeToggle';

import '@/styles/globals.css';
import Signup from './signup';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DarkModeToggle />
      <Component {...pageProps} />
      <Signup/>
    </>
  );
}

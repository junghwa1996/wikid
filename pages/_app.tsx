import type { AppProps } from 'next/app';
import Head from 'next/head';

import DarkModeToggle from '@/components/DarkmodeToggle';
import Headers from '@/components/Headers/Headers';
import { AuthProvider } from '@/utils/AuthContext';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>wikid</title>
        </Head>
        <DarkModeToggle />
        <Headers />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

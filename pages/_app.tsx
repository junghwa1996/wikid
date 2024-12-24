import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import DarkModeToggle from '@/components/DarkmodeToggle';
import Headers from '@/components/Headers/Headers';

import { ProfileProvider } from '../context/ProfileContext';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <ProfileProvider>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>wikid</title>
          </Head>
          <DarkModeToggle />
          <Headers />
          <Component {...pageProps} />
          {/* NOTE : 배포 시 false로 변경  */}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ProfileProvider>
    </>
  );
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Headers from '@/components/Headers/Headers';

import { ProfileProvider } from '../context/ProfileContext';

import '@/styles/globals.css';
import { SnackbarProvider } from 'context/SnackBarContext';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <ProfileProvider>
        <Head>
          <title>wikid</title>
        </Head>

        <SnackbarProvider>
          <Headers />
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            {/* NOTE : 배포 시 false로 변경  */}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SnackbarProvider>
      </ProfileProvider>
    </>
  );
}

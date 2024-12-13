import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="kr">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
        <title>wikid</title>
      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

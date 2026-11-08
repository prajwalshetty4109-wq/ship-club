import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Antonio, Space_Mono, Syne } from 'next/font/google';
import { ClubProvider } from '@/lib/ClubContext';

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-antonio',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-syne',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClubProvider>
      <Head>
        <title>SHIP CLUB — Repository Security Auditor & AI README Studio</title>
        <meta
          name="description"
          content="Automated GitHub Repository Security Auditor, Architecture Inspector, and AI README.md Studio built for Web, PWA, iOS, Android, macOS, and Windows."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      <div className={`${antonio.variable} ${spaceMono.variable} ${syne.variable} font-editorial bg-oled text-white min-h-screen`}>
        <Component {...pageProps} />
      </div>
    </ClubProvider>
  );
}


import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CRYPTOContextProvider } from '@/context/cryptoContext';

import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Tracker',
  description: 'A simple crypto tracker using CoinGecko API and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <CRYPTOContextProvider>{children}</CRYPTOContextProvider>
      </body>
    </html>
  );
}

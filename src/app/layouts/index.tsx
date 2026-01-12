import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/shared/ui/sonner';
import { BottomNav, Header } from '@/widgets/layouts';

import QueryProvider from '../../../app/_providers/QueryProvider';

import '@/app/styles';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '날씨',
  description: '실시간 날씨 정보를 확인하세요',
};

export  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-20 md:pb-6">
              {children}
            </main>
            <BottomNav />
          </div>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

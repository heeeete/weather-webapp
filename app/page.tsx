import { Metadata } from 'next';

import HomePage from '@/_pages/home';

export const metadata: Metadata = {
  title: '현재 위치 날씨',
  description: '현재 위치의 날씨 정보를 확인하세요',
};

export default function Home() {
  return <HomePage />;
}

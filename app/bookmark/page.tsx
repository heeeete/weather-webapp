import { Metadata } from 'next';

import BookmarkPage from '@/pages/bookmark';

export const metadata: Metadata = {
  title: '즐겨찾기',
  description: '즐겨찾기 페이지',
};

export default function Bookmark() {
  return <BookmarkPage />;
}

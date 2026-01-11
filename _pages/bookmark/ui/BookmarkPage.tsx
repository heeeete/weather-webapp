'use client';

import { selectBookmarksRecord, useBookmarkStore } from '@/entities/location';
import { BookmarkList } from '@/widgets/bookmark-weather';

import BookmarkEmpty from './BookmarkEmpty';

export default function BookmarkPage() {
  const bookmarksRecord = useBookmarkStore(selectBookmarksRecord);
  const isEmpty = Object.keys(bookmarksRecord).length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">즐겨찾기</h1>
        <p className="text-muted-foreground">자주 확인하는 지역을 저장해두세요</p>
      </div>

      {isEmpty ? <BookmarkEmpty /> : <BookmarkList />}
    </div>
  );
}

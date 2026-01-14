'use client';

import { useState } from 'react';

import { selectBookmarksRecord, useBookmarkStore } from '@/entities/location';
import { EditBookmarkDialog } from '@/features/bookmark';

import BookmarkItem from './BookmarkItem';

import Masonry from 'react-masonry-css';

export default function BookmarkList() {
  const bookmarksRecord = useBookmarkStore(selectBookmarksRecord);
  const bookmarks = Object.entries(bookmarksRecord).map(([id, name]) => ({ id, name }));
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(null);
  const breakpointColumnsObj = {
    default: 2,
    768: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {bookmarks.map(({ id, name }) => {
          return (
            <div key={id} className="break-inside-avoid">
              <BookmarkItem id={id} name={name} onEdit={() => setEditing({ id, name })} />
            </div>
          );
        })}
      </Masonry>
      <EditBookmarkDialog
        open={!!editing}
        locationId={editing?.id ?? ''}
        defaultName={editing?.name ?? ''}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      />
    </>
  );
}

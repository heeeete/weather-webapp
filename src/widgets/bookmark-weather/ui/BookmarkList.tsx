'use client';

import { useState } from 'react';

import { selectBookmarksRecord, useBookmarkStore } from '@/entities/location';
import { EditBookmarkDialog } from '@/features/bookmark';

import BookmarkItem from './BookmarkItem';

export default function BookmarkList() {
  const bookmarksRecord = useBookmarkStore(selectBookmarksRecord);
  const bookmarks = Object.entries(bookmarksRecord).map(([id, name]) => ({ id, name }));
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(null);

  return (
    <div className="columns-1 gap-4 space-y-4 md:columns-2">
      {bookmarks.map(({ id, name }) => {
        return (
          <div key={id} className="break-inside-avoid">
            <BookmarkItem id={id} name={name} onEdit={() => setEditing({ id, name })} />
          </div>
        );
      })}
      <EditBookmarkDialog
        open={!!editing}
        locationId={editing?.id ?? ''}
        defaultName={editing?.name ?? ''}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      />
    </div>
  );
}

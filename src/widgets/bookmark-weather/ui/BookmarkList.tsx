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
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
      {bookmarks.map(({ id, name }) => {
        return (
          <BookmarkItem key={id} id={id} name={name} onEdit={() => setEditing({ id, name })} />
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

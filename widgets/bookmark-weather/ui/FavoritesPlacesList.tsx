'use client';

import { selectBookmarksRecord, useBookmarkStore } from '@/entities/location';

import FavoritesPlaceItem from './FavoritesPlaceItem';

export default function FavoritesPlacesList() {
  const bookmarksRecord = useBookmarkStore(selectBookmarksRecord);

  const bookmarks = Object.entries(bookmarksRecord).map(([id, name]) => ({ id, name }));

  return (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
      {bookmarks.map(({ id, name }) => {
        return <FavoritesPlaceItem key={id} id={id} name={name} />;
      })}
    </div>
  );
}

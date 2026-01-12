import { selectIsBookmarked, useBookmarkStore } from '@/entities/location';

export function useToggleBookmark(locationId: string) {
  const isBookmarked = useBookmarkStore(selectIsBookmarked(locationId));
  const toggleBookmark = useBookmarkStore((state) => state.toggle);

  return { isBookmarked, toggleBookmark };
}

export const selectIsBookmarked = (id: string) => (state: { bookmarks: Record<string, string> }) =>
  Boolean(state.bookmarks[id]);

export const selectBookmarkIds = (state: { bookmarks: Record<string, string> }) =>
  Object.keys(state.bookmarks);

export const selectBookmarksRecord = (state: { bookmarks: Record<string, string> }) =>
  state.bookmarks;

export const selectBookmarkCount = (state: { bookmarks: Record<string, string> }) =>
  Object.keys(state.bookmarks).length;

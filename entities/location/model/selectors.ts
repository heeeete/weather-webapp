export const selectIsBookmarked = (id: string) => (state: { ids: Record<string, true> }) =>
  Boolean(state.ids[id]);

export const selectBookmarkIds = (state: { ids: Record<string, true> }) => Object.keys(state.ids);

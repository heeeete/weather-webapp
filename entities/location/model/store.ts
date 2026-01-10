// entities/bookmark/model/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LocationId = string;

interface BookmarkState {
  bookmarks: Record<LocationId, string>;

  add: (id: LocationId, name: string) => void;
  remove: (id: LocationId) => void;
  toggle: (id: LocationId, name: string) => void;
  clear: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: {},

      add: (id, name) =>
        set((state) => ({
          bookmarks: { ...state.bookmarks, [id]: name },
        })),

      remove: (id) =>
        set((state) => {
          const next = { ...state.bookmarks };
          delete next[id];
          return { bookmarks: next };
        }),

      toggle: (id, name) => {
        const { bookmarks, add, remove } = get();
        if (bookmarks[id]) remove(id);
        else add(id, name);
      },

      clear: () => set({ bookmarks: {} }),
    }),
    {
      name: 'bookmark',
    },
  ),
);

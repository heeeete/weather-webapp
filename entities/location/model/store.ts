// entities/bookmark/model/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LocationId = string;

interface BookmarkState {
  ids: Record<LocationId, true>;

  add: (id: LocationId) => void;
  remove: (id: LocationId) => void;
  toggle: (id: LocationId) => void;
  clear: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      ids: {},

      add: (id) =>
        set((state) => ({
          ids: { ...state.ids, [id]: true },
        })),

      remove: (id) =>
        set((state) => {
          const next = { ...state.ids };
          delete next[id];
          return { ids: next };
        }),

      toggle: (id) => {
        const { ids, add, remove } = get();
        if (ids[id]) remove(id);
        else add(id);
      },

      clear: () => set({ ids: {} }),
    }),
    {
      name: 'bookmark',
    },
  ),
);

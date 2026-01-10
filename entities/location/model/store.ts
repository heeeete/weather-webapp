// entities/bookmark/model/store.ts
import { toast } from 'sonner';
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
        const bookmarkCount = Object.keys(bookmarks).length;

        if (bookmarkCount >= 6) {
          return toast.error('즐겨찾기는 최대 6개까지 등록할 수 있습니다.');
        }

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

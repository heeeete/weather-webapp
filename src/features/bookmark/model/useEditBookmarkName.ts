'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { useBookmarkStore } from '@/entities/location';

type Params = {
  locationId: string;
  onSuccess: () => void;
};

export function useEditBookmarkName({ locationId, onSuccess }: Params) {
  const updateBookmark = useBookmarkStore((state) => state.update);

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const raw = formData.get('name');
      const name = typeof raw === 'string' ? raw.trim() : '';

      if (!name) {
        toast.error('이름을 입력해주세요.');
        return;
      }

      const isSuccess = updateBookmark(locationId, name);

      if (!isSuccess) {
        toast.error('이미 같은 이름의 즐겨찾기가 있습니다.');
        return;
      }

      toast.success('즐겨찾기 이름이 수정되었습니다.');
      onSuccess();
    },
    [locationId, onSuccess, updateBookmark],
  );

  return { onSubmit };
}

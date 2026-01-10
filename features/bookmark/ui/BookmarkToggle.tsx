'use client';

import { StarIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { useToggleBookmark } from '../model/useToggleBookmark';

export default function BookmarkToggle({ locationId, name }: { locationId: string; name: string }) {
  const { isBookmarked, toggleBookmark } = useToggleBookmark(locationId);

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={() => {
        toggleBookmark(locationId, name);
      }}
    >
      <StarIcon className={cn(isBookmarked && 'fill-yellow-500 text-yellow-500')} />
      <span className="sr-only">{isBookmarked ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'}</span>
    </Button>
  );
}

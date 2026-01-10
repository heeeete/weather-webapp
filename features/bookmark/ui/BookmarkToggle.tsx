import { HeartIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { useToggleBookmark } from '../model/useToggleBookmark';

export default function BookmarkToggle({ locationId }: { locationId: string }) {
  console.log(locationId);
  const { isBookmarked, toggleBookmark } = useToggleBookmark(locationId);

  return (
    <Button variant={'ghost'} size={'icon'} onClick={() => toggleBookmark(locationId)}>
      <HeartIcon className={cn(isBookmarked && 'fill-red-500 text-red-500')} />
    </Button>
  );
}

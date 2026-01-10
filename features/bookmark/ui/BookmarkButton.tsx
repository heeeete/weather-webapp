import { HeartIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

export default function BookmarkButton() {
  return (
    <Button variant={'ghost'} size={'icon'}>
      <HeartIcon />
    </Button>
  );
}

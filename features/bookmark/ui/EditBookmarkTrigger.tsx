import { PencilIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

export default function EditBookmarkTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <PencilIcon className="h-4 w-4" />
      <span className="sr-only">즐겨찾기 이름 수정</span>
    </Button>
  );
}

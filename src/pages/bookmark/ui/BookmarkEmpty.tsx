import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Info } from '@/shared/ui/info';

export default function BookmarkEmpty() {
  return (
    <Info className="flex flex-col items-center gap-4">
      <p>즐겨찾기된 지역이 없습니다.</p>
      <Button asChild>
        <Link href="/">돌아가기</Link>
      </Button>
    </Info>
  );
}

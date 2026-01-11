import { CloudIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <div className="relative">
        <CloudIcon className="size-32 fill-foreground" aria-hidden="true" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-4xl font-bold text-muted-foreground">
          ?
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg text-muted-foreground">페이지를 찾을 수 없습니다</p>
      </div>

      <Button asChild variant="outline" size="lg">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}

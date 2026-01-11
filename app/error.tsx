// app/error.tsx
'use client';

import { useEffect } from 'react';
import { CloudIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <div className="relative">
        <CloudIcon className="size-32 fill-foreground" aria-hidden="true" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-4xl font-bold text-muted-foreground">
          !
        </span>
      </div>

      <div className="space-y-2">
        {/* <h1 className="text-5xl font-bold">500</h1> */}
        <p className="text-lg text-muted-foreground">일시적인 오류가 발생했습니다</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="lg" onClick={() => reset()}>
          다시 시도
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}

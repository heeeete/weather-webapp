import Link from 'next/link';

import { SearchBar } from '@/features/location-search';
import { Button } from '@/shared/ui/button';
import { Info } from '@/shared/ui/info';

type Props = {
  error: Error;
};

export function WeatherError({ error }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <Info className="flex flex-col items-center gap-4 text-center">
        <p className="font-semibold">{error?.message}</p>
      </Info>

      <Button asChild className="mx-auto w-fit">
        <Link href="/">돌아가기</Link>
      </Button>
    </div>
  );
}

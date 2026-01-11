'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';

import { TemperatureDisplay, useWeatherQuery } from '@/entities/weather';
import { BookmarkToggle, EditBookmarkTrigger } from '@/features/bookmark';
import { WeatherApiResponse } from '@/shared/api/open-weather/type';
import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export default function BookmarkItem({
  id,
  name,
  onEdit,
}: {
  id: string;
  name: string;
  onEdit: () => void;
}) {
  const [lat, lon] = id.split(',');
  const { data: weatherData, isPending } = useWeatherQuery(Number(lat), Number(lon));

  return (
    <Link href={`/weather/${lat}/${lon}`}>
      <span className="sr-only">상세 보기</span>
      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
        <CardContent className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="size-5 text-primary" aria-hidden="true" />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <h3 className="text-lg font-medium max-sm:text-base">
              {name}
              <span className="sr-only">상세 날씨로 이동</span>
            </h3>
            <WeatherSummary weatherData={weatherData} isPending={isPending} />
          </div>

          <div
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <BookmarkToggle locationId={id} name={name} />
            <EditBookmarkTrigger onClick={onEdit} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function WeatherSummary({
  weatherData,
  isPending,
}: {
  weatherData: WeatherApiResponse | undefined;
  isPending: boolean;
}) {
  const current = weatherData?.current.temp;
  const max = weatherData?.daily[0].temp.max;
  const min = weatherData?.daily[0].temp.min;

  const labelOrLoading = (title: string, value: number | undefined) => {
    if (isPending) return `${title} 불러오는 중`;
    if (value == null) return `${title} 정보 없음`;
    return `${title} ${Math.round(value)}도`;
  };

  return (
    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
      <div className="flex items-center gap-2" aria-label={labelOrLoading('현재 기온', current)}>
        <span aria-hidden="true">현재 기온</span>
        {isPending ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={current || 0} size="md" aria-hidden="true" />
        )}
      </div>
      <div className="flex items-center gap-2" aria-label={labelOrLoading('최고 기온', max)}>
        <span aria-hidden="true">최고 기온</span>
        {isPending ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={max || 0} size="md" aria-hidden="true" />
        )}
      </div>
      <div className="flex items-center gap-2" aria-label={labelOrLoading('최저 기온', min)}>
        <span aria-hidden="true">최저 기온</span>
        {isPending ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={min || 0} size="md" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

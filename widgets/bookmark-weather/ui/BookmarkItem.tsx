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
      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
        <CardContent className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="size-5 text-primary" />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <h3 className="text-lg font-medium max-sm:text-base">{name}</h3>
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

  return (
    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>현재 기온</span>
        {isPending ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={current || 0} size="md" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span>최고 기온</span>
        {isPending ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={max || 0} size="md" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span>최저 기온</span>
        {isPending ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={min || 0} size="md" />
        )}
      </div>
    </div>
  );
}

'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';

import { useWeatherQuery, WeatherSummary } from '@/entities/weather';
import { BookmarkToggle } from '@/features/bookmark';
import { Card, CardContent } from '@/shared/ui/card';

export default function FavoritesPlaceItem({ id, name }: { id: string; name: string }) {
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
            <WeatherSummary
              current={weatherData?.current.temp}
              max={weatherData?.daily[0].temp.max}
              min={weatherData?.daily[0].temp.min}
              isLoading={isPending}
            />
          </div>

          <BookmarkToggle locationId={id} name={name} />
        </CardContent>
      </Card>
    </Link>
  );
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { Droplet, MapPin, Wind } from 'lucide-react';
import Link from 'next/link';

import { TemperatureDisplay, WeatherApiResponse, weatherQueries } from '@/entities/weather';
import { BookmarkToggle, EditBookmarkTrigger } from '@/features/bookmark';
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
  const {
    data: weatherData,
    isPending,
    isError,
  } = useQuery(weatherQueries.detail(Number(lat), Number(lon)));

  return (
    <Link href={`/weather/${lat}/${lon}`}>
      <span className="sr-only">상세 보기</span>
      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="size-5 text-primary" aria-hidden="true" />
            </div>
            <div
              className="flex items-center justify-end gap-2"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <BookmarkToggle locationId={id} name={name} />
              <EditBookmarkTrigger onClick={onEdit} />
            </div>
          </div>
          <h3 className="text-lg font-medium wrap-break-word max-sm:text-base">
            {name}
            <span className="sr-only">상세 날씨로 이동</span>
          </h3>
          <WeatherSummary weatherData={weatherData} isPending={isPending} isError={isError} />
        </CardContent>
      </Card>
    </Link>
  );
}

function WeatherSummary({
  weatherData,
  isPending,
  isError,
}: {
  weatherData: WeatherApiResponse | undefined;
  isPending: boolean;
  isError: boolean;
}) {
  const current = weatherData?.current?.temp;
  const max = weatherData?.daily?.[0]?.temp?.max;
  const min = weatherData?.daily?.[0]?.temp?.min;
  const humidity = weatherData?.current?.humidity;
  const windSpeed = weatherData?.current?.wind_speed;
  const feels_like = weatherData?.current?.feels_like;
  const temperatureRows: Array<{ key: string; title: string; value: number | undefined }> = [
    { key: 'current', title: '현재 기온', value: current },
    { key: 'max', title: '최고 기온', value: max },
    { key: 'min', title: '최저 기온', value: min },
    { key: 'feels_like', title: '체감 온도', value: feels_like },
  ];

  const temperatureLabel = (title: string, value: number | undefined) => {
    if (isPending) return `${title} 불러오는 중`;
    if (isError) return `${title} 불러오기 실패`;
    if (value == null) return `${title} 정보 없음`;
    return `${title} ${Math.round(value)}도`;
  };

  const humidityLabel = () => {
    if (isPending) return '습도 불러오는 중';
    if (isError) return '습도 불러오기 실패';
    if (humidity == null) return '습도 정보 없음';
    return `습도 ${humidity}%`;
  };

  const windLabel = () => {
    if (isPending) return '바람 불러오는 중';
    if (isError) return '바람 불러오기 실패';
    if (windSpeed == null) return '바람 정보 없음';
    return `바람 초당 ${windSpeed}미터`;
  };

  return (
    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
      {temperatureRows.map(({ key, title, value }) => (
        <div
          key={key}
          className="flex items-center gap-2"
          aria-label={temperatureLabel(title, value)}
        >
          <span aria-hidden="true">{title}</span>
          <span className="flex h-7 items-center" aria-hidden="true">
            {isPending ? (
              <Skeleton className="h-full w-16" />
            ) : isError ? (
              <span>-</span>
            ) : (
              <TemperatureDisplay temp={value ?? 0} size="md" />
            )}
          </span>
        </div>
      ))}

      <div className="flex items-center gap-2" aria-label={humidityLabel()}>
        <Droplet className="size-4" aria-hidden="true" />
        <span className="flex h-7 items-center" aria-hidden="true">
          {isPending ? (
            <Skeleton className="h-full w-16" />
          ) : isError ? (
            <span>-</span>
          ) : humidity != null ? (
            <span className="text-base font-semibold">{humidity}%</span>
          ) : (
            <span>-</span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2" aria-label={windLabel()}>
        <Wind className="size-4" aria-hidden="true" />

        <span className="flex h-7 items-center" aria-hidden="true">
          {isPending ? (
            <Skeleton className="h-full w-16" />
          ) : isError ? (
            <span>-</span>
          ) : windSpeed != null ? (
            <span className="text-base font-semibold">{windSpeed}m/s</span>
          ) : (
            <span>-</span>
          )}
        </span>
      </div>
    </div>
  );
}

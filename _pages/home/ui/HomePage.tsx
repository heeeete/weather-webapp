'use client';

import { useReverseGeocodeQuery } from '@/entities/location';
import { useWeatherQuery } from '@/entities/weather';
import { useCurrentLocation } from '@/features/location-detect';
import { SearchBar } from '@/features/location-search';
import { Spinner } from '@/shared/ui/spinner';
import { CurrentWeatherCard, DailyWeatherList, HourlyWeatherList } from '@/widgets/weather';

import { PermissionDenied } from './PermissionDenied';

export default function HomePage() {
  const { state } = useCurrentLocation({ auto: true });

  const { data: weatherData, isPending, error, isError } = useWeatherQuery(state.lat, state.lon);
  const { data: location, isPending: isLocationPending } = useReverseGeocodeQuery(
    state.lat,
    state.lon,
  );

  if (state.status === 'denied') {
    return <PermissionDenied />;
  }

  if (!isPending && isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      {isPending ? (
        <div role="status" aria-live="polite">
          <Spinner className="mx-auto size-20" />
          <span className="sr-only">날씨 정보를 불러오는 중입니다.</span>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex-1">
              <CurrentWeatherCard
                current={weatherData?.current}
                today={weatherData?.daily[0]}
                location={location}
                isLocationPending={isLocationPending}
              />
            </div>
            <HourlyWeatherList hourlyData={weatherData?.hourly} />
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <DailyWeatherList dailyData={weatherData?.daily} />
          </div>
        </div>
      )}
    </div>
  );
}

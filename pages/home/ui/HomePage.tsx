'use client';

import { useWeatherQuery } from '@/entities/weather';
import { useCurrentLocation } from '@/features/location-detect/model/useCurrentLocation';
import SearchBar from '@/features/location-search/ui/SearchBar';
import { Spinner } from '@/shared/ui/spinner';
import { CurrentWeatherCard, DailyWeatherList, HourlyWeatherList } from '@/widgets/weather';

export default function HomePage() {
  const { state } = useCurrentLocation({ auto: true });

  const { data: weatherData, isPending, error, isError } = useWeatherQuery(state.lat, state.lon);

  if (!isPending && isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      {isPending ? (
        <Spinner className="mx-auto size-20" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex-1">
              <CurrentWeatherCard
                lat={state.lat}
                lon={state.lon}
                current={weatherData?.current}
                today={weatherData?.daily[0]}
                isPending={isPending}
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

'use client';

import { useQuery } from '@tanstack/react-query';

import { formatRegionName, locationQueries } from '@/entities/location';
import { weatherQueries } from '@/entities/weather';
import { BookmarkToggle } from '@/features/bookmark';
import { SearchBar } from '@/features/location-search';
import { Spinner } from '@/shared/ui/spinner';
import { CurrentWeatherCard, DailyWeatherList, HourlyWeatherList } from '@/widgets/weather';

type Props = {
  lon: number;
  lat: number;
};

export default function WeatherDetailPage({ lon, lat }: Props) {
  const {
    data: weatherData,
    isPending,
    error,
    isError,
  } = useQuery(weatherQueries.detail(lat, lon));
  const { data: location, isPending: isLocationPending } = useQuery(
    locationQueries.reverseGeocode(lat, lon),
  );

  if (isError) {
    throw error;
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
            <div className="relative flex-1">
              {location && (
                <div className="absolute top-4 right-4">
                  <BookmarkToggle locationId={`${lat},${lon}`} name={formatRegionName(location)} />
                </div>
              )}

              <CurrentWeatherCard
                current={weatherData?.current}
                today={weatherData?.daily[0]}
                location={location ?? null}
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

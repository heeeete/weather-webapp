'use client';

import { formatRegionName, useReverseGeocodeQuery } from '@/entities/location';
import { useWeatherQuery } from '@/entities/weather';
import { BookmarkToggle } from '@/features/bookmark';
import { SearchBar } from '@/features/location-search';
import { Spinner } from '@/shared/ui/spinner';
import { CurrentWeatherCard, DailyWeatherList, HourlyWeatherList } from '@/widgets/weather';

type Props = {
  lon: number;
  lat: number;
};

export default function WeatherDetailPage({ lon, lat }: Props) {
  const { data: weatherData, isPending, error, isError } = useWeatherQuery(lat, lon);
  const {
    data: location,
    isPending: isLocationPending,
    isError: isLocationError,
    error: locationError,
  } = useReverseGeocodeQuery(lat, lon);

  if (isError) {
    throw error;
  }

  if (isLocationError) {
    throw locationError;
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

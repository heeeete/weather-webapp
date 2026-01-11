import { LocationDisplay } from '@/entities/location';
import { LocationRegionParts } from '@/entities/location/api/reverse-geocode/types';
import { TemperatureDisplay, WeatherIcon } from '@/entities/weather';
import { CurrentWeather, DailyWeather } from '@/entities/weather/api/type';
import { Card, CardContent } from '@/shared/ui/card';

type Props = {
  current: CurrentWeather;
  today: DailyWeather;
  location: LocationRegionParts | null;
  isLocationPending?: boolean;
};

export default function CurrentWeatherCard({ current, today, location, isLocationPending }: Props) {
  if (current == null || today == null) {
    return null;
  }

  const weatherDescription = current.weather[0]?.description || '';

  return (
    <section aria-labelledby="current-weather-title" className="h-full">
      <h2 id="current-weather-title" className="sr-only">
        현재 날씨
      </h2>
      <Card className="h-full">
        <CardContent className="flex h-full flex-col justify-around">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* 위치 & 현재 기온 */}
            <div className="flex flex-col gap-3">
              <LocationDisplay location={location} isPending={isLocationPending} />

              <div className="flex items-baseline gap-2">
                <TemperatureDisplay temp={current.temp} size="xl" />
                <span className="text-lg text-muted-foreground">{weatherDescription}</span>
              </div>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>
                  최고 <TemperatureDisplay temp={today.temp.max} size="sm" />
                </span>
                <span>
                  최저 <TemperatureDisplay temp={today.temp.min} size="sm" />
                </span>
              </div>
            </div>

            {/* 날씨 아이콘 */}
            <div className="flex items-center justify-center">
              <WeatherIcon
                icon={current.weather[0]?.icon}
                description={weatherDescription}
                size="xl"
                ariaHidden={true}
              />
            </div>
          </div>

          {/* 추가 정보 */}
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
            <div className="flex flex-col">
              <dt className="text-xs text-muted-foreground">체감</dt>
              <dd>
                <TemperatureDisplay temp={current.feels_like} size="md" />
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-xs text-muted-foreground">습도</dt>
              <dd className="text-lg font-semibold" aria-label={`습도 ${current.humidity}%`}>
                {current.humidity}%
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-xs text-muted-foreground">바람</dt>
              <dd
                className="text-lg font-semibold"
                aria-label={`바람 초당 ${current.wind_speed}미터`}
              >
                {current.wind_speed}m/s
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-xs text-muted-foreground">UV</dt>
              <dd
                className="text-lg font-semibold"
                aria-label={`자외선 지수 ${Math.round(current.uvi)}`}
              >
                {Math.round(current.uvi)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </section>
  );
}

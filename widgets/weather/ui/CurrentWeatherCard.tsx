'use client';

import { LocationDisplay } from '@/entities/location';
import { TemperatureDisplay, WeatherIcon } from '@/entities/weather';
import { CurrentWeather, DailyWeather } from '@/shared/api/open-weather/type';
import { Card, CardContent } from '@/shared/ui/card';

type Props = {
  lat?: number;
  lon?: number;
  current?: CurrentWeather;
  today?: DailyWeather;
  isLoading?: boolean;
};

export default function CurrentWeatherCard({ lat, lon, current, today, isLoading }: Props) {
  if (isLoading || !current || !today) {
    return null;
  }

  const weatherDescription = current.weather[0]?.description || '';

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col justify-around">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 위치 & 현재 기온 */}
          <div className="flex flex-col gap-3">
            <LocationDisplay lat={lat} lon={lon} />

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
            />
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">체감</span>
            <TemperatureDisplay temp={current.feels_like} size="md" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">습도</span>
            <span className="text-lg font-semibold">{current.humidity}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">바람</span>
            <span className="text-lg font-semibold">{current.wind_speed}m/s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">UV</span>
            <span className="text-lg font-semibold">{Math.round(current.uvi)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

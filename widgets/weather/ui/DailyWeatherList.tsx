'use client';

import { TemperatureDisplay, WeatherIcon } from '@/entities/weather';
import { DailyWeather } from '@/shared/api/open-weather/type';
import { formatUnixKstLabel } from '@/shared/lib/time/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
  dailyData?: DailyWeather[];
};

export default function DailyWeatherList({ dailyData }: Props) {
  if (!dailyData || dailyData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">주간 날씨</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex flex-col divide-y">
          {dailyData.map((day, index) => (
            <div
              key={day.dt}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 text-sm font-medium">
                  {index === 0 ? '오늘' : formatUnixKstLabel(day.dt, 'ddd')}
                </span>
                <WeatherIcon
                  icon={day.weather[0]?.icon || '01d'}
                  description={day.weather[0]?.description}
                  size="sm"
                />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  <TemperatureDisplay temp={day.temp.min} size="sm" />
                </span>
                {/* 일교차 바 그래프 */}
                <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/60"
                    style={{
                      width: `${Math.min(100, Math.max(0, ((day.temp.max - day.temp.min) / 15) * 100))}%`,
                    }}
                  />
                </div>
                <span className="font-medium">
                  <TemperatureDisplay temp={day.temp.max} size="sm" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

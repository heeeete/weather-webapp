'use client';

import { TemperatureDisplay, WeatherIcon } from '@/entities/weather';
import { HourlyWeather } from '@/shared/api/open-weather/type';
import { formatKstLabel } from '@/shared/lib/time/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

type Props = {
  hourlyData?: HourlyWeather[];
  maxItems?: number;
};

export default function HourlyWeatherList({ hourlyData, maxItems = 24 }: Props) {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  const items = hourlyData.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">시간대별 날씨</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea type="hover">
          <div className="flex gap-2">
            {items.map((hour, index) => (
              <div
                key={hour.dt}
                className="flex min-w-[70px] shrink-0 flex-col items-center gap-1 rounded-lg bg-muted/50 p-3"
              >
                <span className="text-xs text-muted-foreground">
                  {index === 0 ? '지금' : formatKstLabel(hour.dt, 'A h시')}
                </span>
                <WeatherIcon
                  icon={hour.weather[0]?.icon || '01d'}
                  description={hour.weather[0]?.description}
                  size="sm"
                />
                <TemperatureDisplay temp={hour.temp} size="sm" />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

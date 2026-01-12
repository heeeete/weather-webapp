'use client';

import { TemperatureDisplay, WeatherIcon } from '@/entities/weather';
import { HourlyWeather } from '@/entities/weather/api/type';
import { formatUnixKstLabel } from '@/shared/lib/time/utils';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
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
    <section aria-labelledby="hourly-weather-title">
      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold" id="hourly-weather-title">
            시간대별 날씨
          </h2>
        </CardHeader>
        <CardContent>
          <ScrollArea type="always" className="pb-2" aria-labelledby="hourly-weather-title">
            <p className="sr-only" id="hourly-weather-help">
              시간대별 날씨 목록입니다. 좌우로 스크롤하여 더 많은 시간을 확인할 수 있습니다.
            </p>
            <ul className="flex gap-2" aria-labelledby="hourly-weather-help">
              {items.map((hour, index) => {
                const labelTime = index === 0 ? '현재' : formatUnixKstLabel(hour.dt, 'A h시');
                const desc = hour.weather[0]?.description ?? '';
                const temp = hour.temp;

                const itemLabel = `${labelTime}, ${desc}, ${Math.round(temp)}도`;

                return (
                  <li
                    key={hour.dt}
                    className="flex min-w-[70px] shrink-0 flex-col items-center gap-1 rounded-lg bg-muted/50 p-3"
                    aria-label={itemLabel}
                  >
                    <span className="text-xs text-muted-foreground" aria-hidden="true">
                      {labelTime}
                    </span>
                    <WeatherIcon
                      icon={hour.weather[0]?.icon || '01d'}
                      description={desc}
                      size="sm"
                      ariaHidden={true}
                    />
                    <TemperatureDisplay temp={temp} size="sm" aria-hidden={true} />
                  </li>
                );
              })}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}

'use client';

import { TemperatureDisplay, WeatherIcon } from '@/entities/weather';
import { DailyWeather } from '@/shared/api/open-weather/type';
import { formatUnixKstLabel } from '@/shared/lib/time/utils';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';

type Props = {
  dailyData?: DailyWeather[];
};

export default function DailyWeatherList({ dailyData }: Props) {
  if (!dailyData || dailyData.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="daily-weather-title">
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-base font-semibold" id="daily-weather-title">
            주간 날씨
          </h2>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ul className="flex flex-col divide-y">
            {dailyData.map((day, index) => {
              const labelDay = index === 0 ? '오늘' : formatUnixKstLabel(day.dt, 'dd');
              const desc = day.weather[0]?.description ?? '';
              const min = day.temp.min;
              const max = day.temp.max;
              const range = Math.round(max - min);

              const itemLabel = `${labelDay}, ${desc}, 최저 ${Math.round(min)}도, 최고 ${Math.round(
                max,
              )}도, 일교차 ${range}도`;

              const barWidth = Math.min(100, Math.max(0, ((max - min) / 15) * 100));

              return (
                <li
                  key={day.dt}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  aria-label={itemLabel}
                >
                  <div className="flex items-center gap-3">
                    {/* 월, 화, 수 ... 일 요일 표시 */}
                    <span className="w-12 text-sm font-medium" aria-hidden="true">
                      {labelDay}
                    </span>

                    <WeatherIcon
                      icon={day.weather[0]?.icon || '01d'}
                      description={desc}
                      size="sm"
                      ariaHidden={true}
                    />
                  </div>

                  {/* 최저/최고 기온 표시 */}
                  <div className="grid grid-cols-[2.5fr_4fr_2.5fr] items-center gap-2 text-sm">
                    <span className="text-muted-foreground" aria-hidden="true">
                      <TemperatureDisplay temp={min} size="sm" />
                    </span>

                    {/* 일교차 바 그래프 */}
                    <div
                      className="h-1 w-16 overflow-hidden rounded-full bg-muted"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>

                    <span className="text-right font-medium" aria-hidden="true">
                      <TemperatureDisplay temp={max} size="sm" />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

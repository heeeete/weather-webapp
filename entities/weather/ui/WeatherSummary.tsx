import { Skeleton } from '@/shared/ui/skeleton';

import { TemperatureDisplay } from './TemperatureDisplay';

type Props = {
  current?: number;
  max?: number;
  min?: number;
  isLoading?: boolean;
};

export function WeatherSummary({ current, max, min, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>현재 기온</span>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={current || 0} size="md" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span>최고 기온</span>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={max || 0} size="md" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span>최저 기온</span>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <TemperatureDisplay temp={min || 0} size="md" />
        )}
      </div>
    </div>
  );
}

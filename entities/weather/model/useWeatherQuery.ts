import { useQuery } from '@tanstack/react-query';

import { getWeather } from '@/shared/api/open-weather/client';
import type { WeatherApiResponse } from '@/shared/api/open-weather/type';

export function useWeatherQuery(lat?: number, lon?: number) {
  const enabled = lat != null && lon != null;

  return useQuery<WeatherApiResponse>({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeather(lat as number, lon as number),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}

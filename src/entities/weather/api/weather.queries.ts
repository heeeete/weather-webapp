import { queryOptions } from '@tanstack/react-query';

import { getWeather } from './get-weather.client';
import type { WeatherApiResponse } from './type';
import { weatherKeys } from './weather.keys';

export const weatherQueries = {
  detail: (lat?: number, lon?: number) =>
    queryOptions<WeatherApiResponse>({
      queryKey: weatherKeys.detail(lat, lon),
      queryFn: () => getWeather(lat!, lon!),
      enabled: lat != null && lon != null,
      staleTime: 1000 * 60 * 10, // 10분
    }),
};

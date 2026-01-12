import { apiClient } from '@/shared/api/api-client';

import { WeatherApiResponse } from './type';

export function getWeather(lat: number, lon: number) {
  return apiClient.get<WeatherApiResponse>('/api/weather', {
    lat,
    lon,
  });
}

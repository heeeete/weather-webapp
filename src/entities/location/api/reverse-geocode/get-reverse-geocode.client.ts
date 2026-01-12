import { apiClient } from '@/shared/api/api-client';

import { ReverseGeocodeResponse } from './types';

export async function getReverseGeocode(lat: number, lon: number) {
  return apiClient.get<ReverseGeocodeResponse>('/api/reverse-geocode', {
    lat,
    lon,
  });
}

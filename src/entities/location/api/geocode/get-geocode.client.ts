import { apiClient } from '@/shared/api/api-client';

import type { GeocodeResponse } from './types';

export async function getGeocode(district: string) {
  return apiClient.get<GeocodeResponse>('/api/geocode', {
    district,
  });
}

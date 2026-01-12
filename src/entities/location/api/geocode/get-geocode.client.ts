import { parseGeocode } from '../../lib/parse-geocode';

import type { GeocodeResponse, LatLon } from './types';

export async function getGeocode(district: string): Promise<LatLon | null> {
  const qs = new URLSearchParams({ district });
  const res = await fetch(`/api/geocode?${qs.toString()}`);

  if (!res.ok) {
    throw new Error(`Geocode API 실패: ${res.status}`);
  }

  const data = (await res.json()) as GeocodeResponse;
  return parseGeocode(data);
}

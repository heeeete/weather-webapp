import type { GeocodeResponse, LatLon } from '../api/geocode/types';

export function parseGeocode(data: GeocodeResponse): LatLon | null {
  const first = data?.addresses?.[0];
  if (!first?.x || !first?.y) return null;

  const lon = Number(first.x);
  const lat = Number(first.y);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  return { lat, lon };
}

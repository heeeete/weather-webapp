import type { LocationRegionParts, ReverseGeocodeResponse } from '../api/reverse-geocode/types';

function safeName(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export function parseReverseGeocodeRegion(
  data: ReverseGeocodeResponse | undefined,
): LocationRegionParts | null {
  const first = data?.results?.[0];
  const region = first?.region;

  if (!region) return null;

  const parts: LocationRegionParts = {
    area1: safeName(region.area1?.name),
    area2: safeName(region.area2?.name),
    area3: safeName(region.area3?.name),
    area4: safeName(region.area4?.name),
  };

  const hasAny = parts.area1 || parts.area2 || parts.area3 || parts.area4;
  return hasAny ? parts : null;
}

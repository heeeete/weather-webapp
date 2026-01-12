import type { LocationRegionParts } from '../api/reverse-geocode/types';

export function formatRegionName(parts: LocationRegionParts): string {
  return [parts.area1, parts.area2, parts.area3, parts.area4].filter(Boolean).join(' ').trim();
}

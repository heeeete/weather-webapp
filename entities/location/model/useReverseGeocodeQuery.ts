'use client';

import { useQuery } from '@tanstack/react-query';

import { getReverseGeocode } from '../api/reverse-geocode/client';
import { LocationRegionParts, ReverseGeocodeResponse } from '../api/reverse-geocode/types';
import { parseReverseGeocodeRegion } from '../lib/parse-reverse-geocode';

export function useReverseGeocodeQuery(lat?: number, lon?: number) {
  return useQuery<ReverseGeocodeResponse, Error, LocationRegionParts | null>({
    queryKey: ['reverse-geocode', lat, lon],
    queryFn: () => getReverseGeocode(lat as number, lon as number),
    enabled: lat != null && lon != null,
    staleTime: 1000 * 60 * 10,
    select: (raw) => parseReverseGeocodeRegion(raw),
  });
}

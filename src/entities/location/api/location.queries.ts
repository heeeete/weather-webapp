import { queryOptions } from '@tanstack/react-query';

import { parseReverseGeocodeRegion } from '../lib/parse-reverse-geocode';

import { getReverseGeocode } from './reverse-geocode/get-reverse-geocode.client';
import type { LocationRegionParts, ReverseGeocodeResponse } from './reverse-geocode/types';
import { locationKeys } from './location.keys';

export const locationQueries = {
  reverseGeocode: (lat?: number, lon?: number) =>
    queryOptions<ReverseGeocodeResponse, Error, LocationRegionParts | null>({
      queryKey: locationKeys.reverseGeocode(lat, lon),
      queryFn: () => getReverseGeocode(lat!, lon!),
      enabled: lat != null && lon != null,
      staleTime: 1000 * 60 * 60 * 24,
      gcTime: 1000 * 60 * 60 * 24 * 7,
      select: (raw) => parseReverseGeocodeRegion(raw),
    }),
};

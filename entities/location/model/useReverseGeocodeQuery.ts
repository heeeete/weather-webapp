import { useQuery } from '@tanstack/react-query';

import { getReverseGeocode } from '../api/reverse-geocode/client';

export function useReverseGeocodeQuery(lat?: number, lon?: number) {
  const enabled = lat != null && lon != null;

  return useQuery<string>({
    queryKey: ['reverse-geocode', lat, lon],
    queryFn: () => getReverseGeocode(lat as number, lon as number),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}

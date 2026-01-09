import { MapPin } from 'lucide-react';

import { formatRegionName } from '../lib/format-region-name';
import { useReverseGeocodeQuery } from '../model/useReverseGeocodeQuery';

interface Props {
  lat?: number;
  lon?: number;
}

export default function LocationDisplay({ lat, lon }: Props) {
  const { data: location } = useReverseGeocodeQuery(lat, lon);

  if (lat == null || lon == null) {
    return;
  }

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <MapPin className="size-4" />
      <span className="text-sm font-medium">{location && formatRegionName(location)}</span>
    </div>
  );
}

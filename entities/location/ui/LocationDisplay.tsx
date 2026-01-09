import { MapPin } from 'lucide-react';

import { Skeleton } from '@/shared/ui/skeleton';

import { useReverseGeocodeQuery } from '../model/useReverseGeocodeQuery';

interface Props {
  lat?: number;
  lon?: number;
}

export default function LocationDisplay({ lat, lon }: Props) {
  const { data: location, isLoading } = useReverseGeocodeQuery(lat, lon);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <MapPin className="size-4" />
        <Skeleton className="h-5 w-30" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <MapPin className="size-4" />
      <span className="text-sm font-medium">{location}</span>
    </div>
  );
}

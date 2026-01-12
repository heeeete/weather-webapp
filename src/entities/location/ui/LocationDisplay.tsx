import { MapPin } from 'lucide-react';

import { Skeleton } from '@/shared/ui/skeleton';

import { LocationRegionParts } from '../api/reverse-geocode/types';
import { formatRegionName } from '../lib/format-region-name';

interface Props {
  location?: LocationRegionParts | null;
  isPending?: boolean;
}

export default function LocationDisplay({ location, isPending }: Props) {
  if (isPending) {
    return (
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <MapPin className="size-4" />
        <Skeleton className="h-5 w-50" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <MapPin className="size-4" />
      <span className="text-sm font-medium">{location ? formatRegionName(location) : ''}</span>
    </div>
  );
}

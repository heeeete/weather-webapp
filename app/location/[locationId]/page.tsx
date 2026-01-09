import PlaceDetailPage from '@/pages/place-detail/ui/PlaceDetailPage';

export default async function PlacePage({ params }: { params: Promise<{ locationId: string }> }) {
  const { locationId } = await params;

  return <PlaceDetailPage locationId={locationId} />;
}

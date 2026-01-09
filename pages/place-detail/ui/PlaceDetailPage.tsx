'use client';

type Props = {
  locationId: string;
};

export default function PlaceDetailPage({ locationId }: Props) {
  return (
    <div>
      {locationId && (
        <div>
          <h1>Place Detail</h1>
          <p>Location ID: {locationId}</p>
        </div>
      )}
    </div>
  );
}

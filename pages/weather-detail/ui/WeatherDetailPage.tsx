'use client';

type Props = {
  lon: string;
  lat: string;
};

export default function WeatherDetailPage({ lon, lat }: Props) {
  return (
    <div>
      {lon && lat && (
        <div>
          <h1>Place Detail</h1>
          <p>Lon: {lon}</p>
          <p>Lat: {lat}</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useWeatherQuery } from '@/entities/weather';

type Props = {
  lon: string;
  lat: string;
};

export default function WeatherDetailPage({ lon, lat }: Props) {
  console.log(lon, lat);
  const { data: weatherData, isPending } = useWeatherQuery(Number(lat), Number(lon));

  console.log(weatherData);
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

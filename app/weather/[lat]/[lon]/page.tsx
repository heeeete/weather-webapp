import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

import WeatherDetailPage from '@/_pages/weather-detail';
import { formatRegionName, parseReverseGeocodeRegion } from '@/entities/location';
import { fetchReverseGeocode } from '@/entities/location/api/reverse-geocode/server';
import { fetchWeather } from '@/entities/weather/api/server';

interface PageProps {
  params: Promise<{
    lat: string;
    lon: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lat, lon } = await params;
  const geocodeData = await fetchReverseGeocode(lat, lon);
  const region = parseReverseGeocodeRegion(geocodeData);
  const regionName = region ? formatRegionName(region) : `${lat}, ${lon}`;

  return {
    title: `${regionName} 날씨`,
  };
}

export default async function WeatherPage({ params }: PageProps) {
  const { lat, lon } = await params;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['weather', Number(lat), Number(lon)],
      queryFn: () => fetchWeather(lat, lon),
      staleTime: 60 * 1_000 * 10,
    }),
    queryClient.prefetchQuery({
      queryKey: ['reverse-geocode', Number(lat), Number(lon)],
      queryFn: () => fetchReverseGeocode(lat, lon),
      staleTime: 60 * 1_000 * 10,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeatherDetailPage lat={Number(lat)} lon={Number(lon)} />
    </HydrationBoundary>
  );
}

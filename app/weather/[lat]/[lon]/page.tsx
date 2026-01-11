import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import WeatherDetailPage from '@/_pages/weather-detail';
import { fetchReverseGeocode } from '@/entities/location/api/reverse-geocode/server';
import { fetchWeather } from '@/entities/weather/api/server';

// 10분마다 재생성 (ISR)
export const revalidate = 600;

interface PageProps {
  params: Promise<{
    lat: string;
    lon: string;
  }>;
}

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { lat, lon } = await params;
//   const geocodeData = await fetchReverseGeocode(lat, lon);
//   const region = parseReverseGeocodeRegion(geocodeData);
//   const regionName = region ? formatRegionName(region) : `${lat}, ${lon}`;

//   return {
//     title: `${regionName} 날씨`,
//   };
// }

export default async function WeatherPage({ params }: PageProps) {
  const { lat, lon } = await params;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 10, // 10분
      },
    },
  });

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['weather', Number(lat), Number(lon)],
      queryFn: () => fetchWeather(lat, lon),
    }),
    queryClient.prefetchQuery({
      queryKey: ['reverse-geocode', Number(lat), Number(lon)],
      queryFn: () => fetchReverseGeocode(lat, lon),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeatherDetailPage lat={Number(lat)} lon={Number(lon)} />
    </HydrationBoundary>
  );
}

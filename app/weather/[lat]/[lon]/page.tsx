import WeatherDetailPage from '@/_pages/weather-detail';

interface PageProps {
  params: Promise<{
    lat: string;
    lon: string;
  }>;
}

export default async function WeatherPage({ params }: PageProps) {
  const { lat, lon } = await params;

  return <WeatherDetailPage lat={Number(lat)} lon={Number(lon)} />;
}

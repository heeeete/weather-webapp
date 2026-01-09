export async function getGeocode(district: string) {
  const res = await fetch(`/api/geocode?district=${district}`);

  if (!res.ok) {
    throw new Error(`네이버 Geocode 실패: ${res.status}`);
  }

  const data = await res.json();

  return {
    lat: data.addresses[0].y,
    lon: data.addresses[0].x,
  };
}

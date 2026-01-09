export async function getReverseGeocode(lat: number, lon: number) {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    throw new Error(`Reverse Geocode API 실패: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

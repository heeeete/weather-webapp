export async function getReverseGeocode(lat: number, lon: number) {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    const data = await res.json();
    if (res.status === 400) {
      throw new Error(`잘못된 요청입니다 : ${data.error}`);
    }
    throw new Error(`Reverse Geocode API 실패: ${data.error}`);
  }

  return await res.json();
}

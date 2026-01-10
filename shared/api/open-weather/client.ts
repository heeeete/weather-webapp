export async function getWeather(lat: number, lon: number) {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    throw new Error(`Weather API 요청 실패: ${res.status}`);
  }

  return res.json();
}

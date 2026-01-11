export async function getWeather(lat: number, lon: number) {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    const data = await res.json();
    if (res.status === 400) {
      throw new Error(`잘못된 요청입니다 : ${data.error}`);
    }
    throw new Error(`날씨 정보 요청 실패 : ${data.error}`);
  }

  return res.json();
}

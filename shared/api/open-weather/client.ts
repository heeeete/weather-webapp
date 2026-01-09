export async function getWeather(lat: number, lon: number) {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

  return res.json();
}

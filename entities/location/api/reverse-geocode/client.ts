export async function getReverseGeocode(lat: number, lon: number) {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);

  const data = await res.json();
  return (
    data.results[0].region.area1.name +
    ' ' +
    data.results[0].region.area2.name +
    ' ' +
    data.results[0].region.area3.name +
    ' ' +
    data.results[0].region.area4.name
  ).trim();
}

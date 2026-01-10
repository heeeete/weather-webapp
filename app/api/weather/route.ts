import { NextResponse } from 'next/server';

const REVALIDATE_SEC = 60 * 10; // 10분

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat')?.trim();
  const lon = searchParams.get('lon')?.trim();
  const apiKey = process.env.OPEN_WEATHER_KEY;

  if (!lat || !lon) {
    return NextResponse.json(
      { error: '위도 또는 경도가 필요합니다.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPEN_WEATHER_KEY 환경 변수가 필요합니다.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`,
    {
      next: {
        revalidate: REVALIDATE_SEC,
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `OpenWeather 요청 실패: ${res.status}` },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const data = await res.json();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': `public, max-age=0, s-maxage=${REVALIDATE_SEC}`,
    },
  });
}

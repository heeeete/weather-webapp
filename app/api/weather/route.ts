import { NextResponse } from 'next/server';

import { fetchWeather, REVALIDATE_SEC } from '@/entities/weather/api/fetch-weather.server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat')?.trim();
  const lon = searchParams.get('lon')?.trim();

  if (!lat || !lon) {
    return NextResponse.json(
      { error: '위도 또는 경도가 필요합니다.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const data = await fetchWeather(lat, lon);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, max-age=0, s-maxage=${REVALIDATE_SEC}`,
      },
    });
  } catch (error) {
    console.error('[GET /api/weather]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '날씨 정보 요청에 실패했습니다.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

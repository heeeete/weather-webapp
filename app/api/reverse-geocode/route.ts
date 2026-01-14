import { NextResponse } from 'next/server';

import {
  fetchReverseGeocode,
  REVALIDATE_SEC,
  STALE_SEC,
} from '@/entities/location/api/reverse-geocode/fetch-reverse-geocode.server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lon = searchParams.get('lon');
  const lat = searchParams.get('lat');

  if (lon == null || lat == null) {
    return NextResponse.json(
      { error: '위도와 경도는 필수입니다.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const data = await fetchReverseGeocode(lat, lon);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${REVALIDATE_SEC}, stale-while-revalidate=${STALE_SEC}`,
      },
    });
  } catch (error) {
    console.error('Reverse Geocode API 실패:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Reverse Geocode 요청 실패' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

import { NextResponse } from 'next/server';

const REVALIDATE_SEC = 60 * 60 * 24; // 1일
const STALE_SEC = 60 * 60 * 24; // 1일

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const district = searchParams.get('district');

  if (!district) {
    return NextResponse.json(
      { error: '지역명은 필수입니다.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET는 필수입니다.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const params = new URLSearchParams({
    query: district,
  });

  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?${params}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': clientId,
      'X-NCP-APIGW-API-KEY': clientSecret,
    },
    next: {
      revalidate: REVALIDATE_SEC,
      tags: ['geocode', district],
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `네이버 Geocode 실패: ${res.status}` },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const data = await res.json();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': `public, s-maxage=${REVALIDATE_SEC}, stale-while-revalidate=${STALE_SEC}`,
    },
  });
}

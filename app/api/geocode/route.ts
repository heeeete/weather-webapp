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
    console.error('[GET /api/geocode] NAVER API 키가 설정되지 않음');
    return NextResponse.json(
      { error: '서버 설정 오류가 발생했습니다.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const params = new URLSearchParams({
    query: district,
  });

  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?${params}`;

  try {
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
      const text = await res.text();
      console.error(`[GET /api/geocode] Naver API 실패: ${res.status}`, text);
      return NextResponse.json(
        { error: `위치 검색에 실패했습니다. (${res.status})` },
        { status: 502, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${REVALIDATE_SEC}, stale-while-revalidate=${STALE_SEC}`,
      },
    });
  } catch (error) {
    console.error('[GET /api/geocode]', error);
    return NextResponse.json(
      { error: '위치 검색 중 오류가 발생했습니다.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

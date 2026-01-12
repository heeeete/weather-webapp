import 'server-only';

const REVALIDATE_SEC = 60 * 60 * 24; // 1일
const STALE_SEC = 60 * 60 * 24 * 7; // 7일

export async function fetchReverseGeocode(lat: string, lon: string) {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('[fetchReverseGeocode] NAVER API 키가 설정되지 않음');
    throw new Error('서버 설정 오류가 발생했습니다.');
  }

  const params = new URLSearchParams({
    coords: `${lon},${lat}`,
    orders: 'legalcode',
    output: 'json',
  });

  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?${params}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': clientId,
      'X-NCP-APIGW-API-KEY': clientSecret,
    },
    next: {
      revalidate: REVALIDATE_SEC,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[fetchReverseGeocode] Naver API 실패: ${res.status}`, text);
    throw new Error(`위치 정보를 가져올 수 없습니다. (${res.status})`);
  }

  const data = await res.json();

  return data;
}

export { REVALIDATE_SEC, STALE_SEC };

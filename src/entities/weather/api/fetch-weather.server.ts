import { ApiError } from '@/shared/api/api-client';

import 'server-only';

const REVALIDATE_SEC = 60 * 10; // 10분

export async function fetchWeather(lat: string, lon: string) {
  const apiKey = process.env.OPEN_WEATHER_KEY;
  if (!apiKey) {
    console.error('[fetchWeather] OPEN_WEATHER_KEY 환경 변수가 설정되지 않음');
    throw new ApiError('서버 설정 오류가 발생했습니다.', 500);
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
    const text = await res.text();
    console.error(`[fetchWeather] OpenWeather API 실패: ${res.status}`, text);
    throw new ApiError('날씨 정보를 가져올 수 없습니다.', 502, {
      upstreamStatus: res.status,
      upstreamBody: text,
    });
  }

  return res.json();
}

export { REVALIDATE_SEC };

# ☀️ Weather Web App

> **Next.js 16 App Router + OpenWeather API 기반 날씨 웹 애플리케이션**

위도/경도 기반 날씨 정보 조회와 북마크 기능을 제공하는 날씨 웹앱입니다. FSD(Feature-Sliced Design) 아키텍처를 적용하여 확장 가능하고 유지보수하기 쉬운 구조로 설계되었습니다.


## 📚 목차

- [실행 방법](#-실행-방법)
- [Tech Stack](#-tech-stack)
- [프로젝트 구조](#-프로젝트-구조)
- [기술적 의사결정](#-기술적-의사결정-및-이유)
- [주요 기능](#-주요-기능)
- [문제 해결](#-문제-해결)
- [느낀점](#-느낀점)

## 🚀 실행 방법

1. 환경 변수 파일(`.env`) 프로젝트 루트에 삽입

   ```bash
   NAVER_CLIENT_ID=your_client_id
   NAVER_CLIENT_SECRET=your_client_secret
   OPEN_WEATHER_KEY=your_api_key
   ```

2. 명령어 실행
   ```bash
   $ pnpm install
   $ pnpm build
   $ pnpm start
   ```

<br />

## 🛠 Tech Stack

### Core

- **Next.js 16.1** (App Router)
  - React Server Components와 App Router를 활용한 최신 아키텍처 적용
  - ISR(Incremental Static Regeneration)을 통한 성능 최적화


- **TypeScript**
  - 정적 타입 체크를 통해 런타임 에러 가능성을 사전에 줄임

- **pnpm**
  - 패키지 재사용(store) 구조로 설치 속도 향상 및 디스크 공간 절약
### State Management & Data Fetching

- **Zustand** (persist middleware)
  - 간결한 API로 전역 상태를 비교적 적은 코드로 관리
  - persist 미들웨어로 북마크 데이터를 localStorage에 저장/복원
  - 여러 페이지/컴포넌트에서 공유되는 상태(북마크 등)에 적합
  - selector로 스토어 조회 로직을 분리해 재사용성과 가독성 개선

- **TanStack Query**
  - 서버 상태(날씨/지오코딩) 캐싱 및 hydration으로 중복 요청 방지
  - queryOptions 기반 Query Options Factory로 쿼리 키/옵션을 일관되게 관리

### UI & Styling

- **Tailwind CSS v4**
  - 유틸리티 우선 접근 방식으로 빠른 스타일링
  - 빌드 시 사용한 클래스만 생성하여 CSS 크기를 최적화
- **shadcn/ui**
  - Radix UI 기반의 접근성 높은 컴포넌트
  - 커스터마이징이 자유로워 디자인 시스템 구축에 유리
  - 빠른 UI 개발을 위해 선택

- **lucide-react**
  - 가볍고 일관된 아이콘 라이브러리
  - Tree-shaking 지원

### Libraries

- **dayjs**
  - moment.js 대비 가벼운 용량 (2KB)
  - 날씨 데이터의 시간 포맷팅에 사용

<br />

## 📁 프로젝트 구조

```
weather-webapp/
├── app/                        # Next.js App Router
│   ├── page. tsx                # 메인 페이지 (현재 위치 기반)
│   ├── weather/[lat]/[lon]/    # 동적 라우트 (검색 기반 날씨)
│   ├── bookmark/               # 북마크 페이지
│   └── api/                    # API Routes
│       ├── weather/            # 날씨 조회
│       ├── geocode/            # 주소 → 좌표 변환
│       └── reverse-geocode/    # 좌표 → 주소 변환
│
└── src/                        # FSD 아키텍처
    ├── app/                    # 앱 전역 설정 (Providers, layout)
    ├── pages/
    │   ├── home/               # 홈페이지
    │   ├── weather-detail/     # 날씨 상세 페이지
    │   └── bookmark/           # 북마크 페이지
    ├── widgets/
    │   ├── weather/            # 날씨 위젯 (현재, 시간별, 일별)
    │   ├── bookmark-weather/   # 북마크 날씨 카드
    │   └── layouts/            # 레이아웃 컴포넌트
    ├── features/
    │   ├── location-detect/    # 현재 위치 감지
    │   ├── location-search/    # 지역 검색
    │   └── bookmark/           # 북마크 추가/삭제/수정
    ├── entities/
    │   ├── weather/            # 날씨 데이터, API
    │   └── location/           # 위치 데이터, 북마크 스토어
    └── shared/                 # 공용 리소스
        ├── ui/                 # 공용 UI 컴포넌트
        ├── lib/                # 유틸리티 함수
        └── api/                # API 클라이언트
```

## 💡 기술적 의사결정 및 이유

### 1️⃣ 외부 API 선택

1. **Weather API** (OpenWeather)
  - 위도/경도 기반 날씨 정보 제공 → Geolocation API와 자연스러운 연동
  - (비교) 공공데이터포털 API는 X/Y 격자 좌표 변환이 필요해 구현 복잡도가 증가

2. **Geocode API** (Naver Maps)
  - 사용자가 검색한 지역명 → 위도/경도 변환
  - 예: "서울시 강남구" → `{lat: 37.4979, lon: 127.0276}`

3. **Reverse Geocode API** (Naver Maps)
  - 위도/경도 → 상세 주소 변환
  - 사용자에게 "서울특별시 강남구 역삼동"처럼 읽기 쉬운 지역명 표시
  - 검색한 지역명을 저장할 수도 있지만, 현재 좌표의 **정확한 행정구역명**을 보여주는 게 UX상 더 좋다고 판단


### 2️⃣ Zustand + persist 조합

**선택 이유:**

- 북마크는 **로컬 상태**이며 **새로고침 시 유지**되어야 함
- Zustand는 간결하면서도 `persist` 미들웨어로 localStorage 동기화 자동 처리

**구현 세부사항:**

```typescript
// src/entities/location/model/store.ts
export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks:  {},
      add: (id, name) => { /* ... */ },
      remove: (id) => { /* ... */ },
      toggle: (id, name) => { /* ... */ },
      update: (id, name) => { /* ... */ },
    }),
    { name: 'bookmark' } // localStorage 키
  )
);
```

### 3️⃣ ISR(Incremental Static Regeneration) 적용

- 날씨 데이터는 자주 변하지만, **매 요청마다 서버에서 새로 렌더링할 필요는 없음**
- 동일한 지역의 날씨 페이지는 여러 사용자가 반복 조회할 수 있어 **캐시 효율이 높음**
- 캐싱 유지 기간을 10분으로 설정한 이유
  - OpenWeather의 날씨 데이터는 문서상 갱신 주기가 **약 10분으로 안내**되어 있어, 불필요한 리렌더링을 줄이기 위해 revalidate=600을 적용

**적용 방법:**

```typescript
// app/weather/[lat]/[lon]/page.tsx
export const revalidate = 600; // 10분마다 재생성

export async function generateStaticParams() {
  return []; // 빌드 시 미리 생성할 경로 없음
}

export const dynamicParams = true; // 요청 시 생성 허용
```

**효과:**

- 최초 요청: 서버에서 렌더링 (약 100ms)
- 이후 10분간: 캐시된 HTML 반환 (약 20ms) → **80% 성능 개선**

### 4️⃣ API Client 설계 (Fetch Wrapper)

**적용 이유:**
- 외부 API 호출이 많아지면서 fetch의 예외/에러 응답 처리를 매번 반복하지 않기 위해 공통화
- HTTP status, 서버 에러 메시지, 응답 payload를 일관된 형태로 다루기 위해 ApiError 도입

**구현 포인트:**
- 네트워크 오류와 HTTP 오류를 분리 처리
- JSON이 아닌 응답에 대비해 safeJson으로 파싱 안정화
- query string 생성 로직을 유틸로 분리해 중복 제거

```js
// src/shared/api/api-client.ts
export class ApiError extends Error { /* ... */ }
export class ApiClient { /* ... */ }
```

--- 

## ✨ 주요 기능

### 1️⃣ 메인 페이지 (현재 위치 기반 날씨)

**구현 내용:**

- **Geolocation API**로 사용자의 현재 위도/경도 감지
- 위치 권한 거부 시 안내 화면 표시
- Reverse Geocode API로 좌표를 "서울특별시 강남구 역삼동" 형식의 주소로 변환
- 현재 날씨, 시간별 예보, 일별 예보 표시

**핵심 로직:**

```typescript
// src/features/location-detect/model/useCurrentLocation.ts
export function useCurrentLocation(options?:  { auto?: boolean }) {
  const [state, setState] = useState<GeoState>({ status: 'idle' });

  const request = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'success',
          lat: Number(pos.coords.latitude. toFixed(4)),
          lon: Number(pos.coords.longitude.toFixed(4)),
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: 'denied' });
        }
      }
    );
  }, []);

  return { state, request };
}
```

**UX 고려사항:**

- 위치 조회/날씨 조회 중에는 로딩 스피너 표시
- 권한 거부 시 명확한 안내 메시지 제공
- 좌표는 소수점 4자리까지만 사용 (캐시 성능 향상)

---

### 2️⃣ 날씨 페이지 (검색 기반 날씨)

**구현 내용:**

- 검색창으로 지역 검색 (shadcn/ui의 Command 컴포넌트)
- Geocode API로 검색어를 위도/경도로 변환
- 동적 라우트 `/weather/[lat]/[lon]`으로 이동
- ISR 적용으로 조회되는 지역은 캐싱
- 지역 이름을 메타데이터에 적용

**검색 플로우:**

```
사용자 입력:  "서울시 강남구"
    ↓
Geocode API 호출
    ↓
좌표 획득:  {lat: 37.4979, lon: 127.0276}
    ↓
라우팅:  /weather/37.4979/127.0276
    ↓
페이지에서 Weather API + Reverse Geocode API 병렬 호출
```

**성능 최적화:**

```typescript
// app/weather/[lat]/[lon]/page.tsx

// ISR: 캐시된 페이지를 재사용하고 10분마다 재생성
export const revalidate = 600;
export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function WeatherPage({ params }: PageProps) {
  ...

  // 병렬 prefetch + hydration으로 중복 요청 제거(워터폴 방지)
  await Promise.all([
    queryClient. prefetchQuery({
      queryKey: weatherKeys.detail(Number(lat), Number(lon)),
      queryFn: () => fetchWeather(lat, lon),
    }),
    queryClient.prefetchQuery({
      queryKey: locationKeys.reverseGeocode(Number(lat), Number(lon)),
      queryFn: () => fetchReverseGeocode(lat, lon),
    }),
  ]);

  ...
}
```

---

### 3️⃣ 북마크 페이지

**구현 내용:**

- 최대 6개 지역 북마크 가능 (초과 시 토스트 메시지)
- 북마크 이름 수정 기능 (중복 이름 검증)
- 실시간 날씨 정보 동시 표시 (TanStack Query의 병렬 요청)
- localStorage에 자동 저장 (Zustand persist)

**핵심 기능:**

1. **북마크 추가/삭제 토글**

```typescript
// src/entities/location/model/store.ts
toggle: (id, name) => {
  const { bookmarks, add, remove } = get();
  const bookmarkCount = Object.keys(bookmarks).length;

  if (bookmarks[id]) {
    remove(id);
  } else {
    if (bookmarkCount >= 6) {
      return toast. error('즐겨찾기는 최대 6개까지 등록할 수 있습니다.');
    }
    add(id, name);
  }
}
```

2. **이름 수정 (중복 검증)**

```typescript
// src/features/bookmark/model/useEditBookmarkName.ts
update: (id, name) => {
  const isDuplicate = Object.entries(bookmarks).some(
    ([existingId, existingName]) => existingId !== id && existingName === name
  );

  if (isDuplicate) {
    return false; // 실패
  }

  set((state) => ({
    bookmarks: { ...state.bookmarks, [id]: name },
  }));
  return true; // 성공
}
```

**UX 고려사항:**

- 북마크 추가/삭제 시 즉각적인 피드백(토스트)
- 이름 수정 모달에서 Enter 키로 저장
- 빈 상태일 때 안내 메시지 표시

---

## 🛠 문제 해결

### 1️⃣ 동적 라우트가 빌드에서 계속 Dynamic Rendering으로 분류되던 문제

#### 문제

- **/weather/[lat]/[lon]** 페이지에 **export const revalidate = 600**을 설정했는데도 **ISR이 동작하지 않음**
- Vercel 응답 헤더가 **Cache-Control: private, no-store**로 떨어졌고, 캐시 흔적(**age**, **x-vercel-cache: HIT/STALE**)도 잡히지 않음
- `next build` 결과에서도 해당 라우트가 **ƒ (Dynamic)** 로 표시
- 테스트로 동적 라우트 파일을 만들고 내부에서 **params**를 사용하지 않아도 빌드 결과는 계속 **Dynamic**

#### 원인

- App Router에서 동적 세그먼트(`[]`) 라우트는 **정적으로 생성 가능한 경로 목록이 없으면** 자동으로 Dynamic 렌더링으로 판단
- 즉, **revalidate**만으로는 이 라우트가 **SSG/ISR**로 들어가지 못했고, 결과적으로 캐시가 꺼진 상태(**no-store**)로 동작

#### 해결


```ts
export const revalidate = 600;

// 빌드 시 미리 생성할 경로는 없지만, 이 라우트가 SSG/ISR 가능함을 명시
export async function generateStaticParams() {
  return [];
}

// 빌드에 없던 경로도 요청 시 생성 후 캐싱
export const dynamicParams = true;
```

#### 결과

- `next build`에서 해당 라우트가 **SSG**로 생성됨
- 이후 Vercel 캐시(**x-vercel-cache**, **age**)가 잡히는 걸 확인
- 캐시 히트 기준으로 해당 문서 요청 속도가 기존 약 **100ms → 20ms로 약 80% 개선**

#### 추가 고려사항

`fetch`에 `next:  { revalidate: 600 }` 같은 **데이터 캐시**를 걸어두면 API 호출 자체는 캐시될 수 있었지만, **라우트가 Dynamic으로 남아 있으면 요청마다 서버 렌더 비용이 계속 발생**할 수 있었습니다. 그래서 더 좋은 성능을 위해 라우트를 SSG/ISR 렌더링으로 분류되도록 하는 방향으로 진행했습니다.

---

### 2️⃣ FSD 아키텍처 세팅 이슈

#### 문제

`next build` 실행 시 아래 에러가 발생:

```zsh
Error: No QueryClient set, use QueryClientProvider to set one
    at g (. next/server/chunks/ssr/[root-of-the-server]__b1a50f04. _. js:3:7155)
    at t (. next/server/chunks/ssr/[root-of-the-server]__b457ffcf._.js:1:2472)
Export encountered an error on /home/ui/HomePage, exiting the build.
```

#### 원인

처음에는 TanStack Query 설정 문제로 보였지만, 실제 원인은 **루트의 `pages/` 디렉토리가 Next.js의 Pages Router로 인식된 것**이었습니다.

**문제 상황:**

- 프로젝트는 **App Router** 구조로 `app/layout.ts`를 사용하고 있었음
- `pages/`는 라우트가 아니라 단순히 **컴포넌트를 모아두는 폴더**로 사용 (FSD 아키텍처)
- `app/page.tsx`에서 `pages/home/ui/HomePage.tsx`를 import해서 사용

**Next.js의 동작:**

- Next.js는 루트의 `pages/`를 **Pages Router**로 자동 인식
- `pages/home/ui/HomePage.tsx`를 `/home/ui/HomePage` **라우트**로 자동 생성/빌드하려고 시도
- 그 과정에서 해당 라우트는 `app/layout.ts` 트리(**Provider가 적용되는 트리**)를 타지 않게 됨
- 결과적으로 **QueryClientProvider 없이** Query 훅이 실행되며 에러 발생

#### 해결

`pages/` 디렉토리가 라우팅 대상으로 인식되지 않도록 경로를 변경:

```
pages/ → src/pages/
pages/README.md
```

#### 정리

- 컴포넌트 보관용 폴더는 pages/처럼 Next.js가 라우팅에 사용하는 예약 디렉토리명을 피하는 것이 안전하다.
- FSD 구조를 사용할 경우 src/ 하위로 구성(src/pages, src/widgets, src/features 등)하면 Next.js 라우팅과 충돌할 가능성이 줄어든다..

---

## ⭐ 느낀점

이번 프로젝트를 진행하면서 가장 시간을 많이 쏟은 부분은 FSD 아키텍처를 적용하고 익숙해지는 과정이었습니다. 처음에는 **레이어/슬라이스/세그먼트** 개념이 낯설어서, **이 함수와 컴포넌트는 어디에 둬야 하지?** 같은 고민을 계속 했고 파일 위치를 옮기고 구조를 쪼개는 일을 반복했습니다.

하지만 3일차쯤부터는 구조에 점점 익숙해졌고, 기능을 추가할 때 entities를 조합해 빠르게 확장할 수 있었습니다. 특히 한 번 만들어 둔 로직과 UI가 다른 화면에서도 자연스럽게 재사용되는 경험을 하면서 왜 FSD를 쓰는지를 체감했습니다.

결과적으로 FSD 아키텍처의 장점을 직접 경험한 프로젝트였습니다. 다음 프로젝트에서도 규모나 요구사항에 맞다면 FSD 적용을 적극적으로 고려해볼 생각입니다.
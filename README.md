# 🛠 문제 해결

## 1️⃣ 동적 라우트가 빌드에서 계속 Dynamic Rendering으로 분류되던 문제

### 문제

- **/weather/[lat]/[lon]** 페이지에 **export const revalidate = 600**을 설정했는데도 **ISR이 동작하지 않음**
- Vercel 응답 헤더가 **Cache-Control: private, no-store**로 떨어졌고, 캐시 흔적(**age**, **x-vercel-cache: HIT/STALE**)도 잡히지 않음.
- next build 결과에서도 해당 라우트가 **ƒ (Dynamic)** 로 표시.
- 테스트로 동적 라우트 파일을 만들고 내부에서 **params** 를 사용하지 않아도 빌드 결과는 계속 **Dynamic**.

### 원인

- App Router에서 동적 세그먼트(`[]`) 라우트는 정적으로 생성 가능한 경로 목록이 없으면 자동으로 Dynamic 렌더링으로 판단

- 즉 **revalidate**만으로는 이 라우트가 **SSG/ISR** 으로 들어가지 못했고, 결과적으로 캐시가 꺼진 상태(**no-store**)로 동작

### 해결

동적 라우트를 **요청 시 생성 후 캐시(ISR)** 하게 만들기 위해 아래 설정을 추가

```ts
export const revalidate = 600;

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
```

- **generateStaticParams() { return [] }** 를 추가해 빌드 시 미리 만들 경로는 없지만, 이 라우트가 SSG/ISR 가능한 라우트임을 명시
- **dynamicParams = true** 로 빌드에 없던 경로도 요청 시 생성 후 캐시

### 결과

- next build에서 해당 라우트가 SSG로 생성 됐다.
- 이후 Vercel 캐시(x-vercel-cache, age)가 잡히는걸 확인
- 캐시 히트 기준으로 해당 문서 요청 속도가 기존 약 **100ms → 20ms로 약 80% 개선**됐다.

### 참고

fetch에 next: { revalidate: 600 } 같은 데이터 캐시를 걸어두면 API 호출 자체는 캐시될 수 있었지만, 라우트가 Dynamic으로 남아 있으면 요청마다 서버 렌더 비용이 계속 발생할 수 있었다. 그래서 더 좋은 성능을 위해 라우트를 SSG/ISR 렌더링으로 분류되도록 하는 방향으로 진행했습니다.

## 2️⃣ FSD 아키텍처 세팅 이슈

### 문제

next build 실행 시 아래 에러가 발생했다.

```zsh
Error: No QueryClient set, use QueryClientProvider to set one
    at g (.next/server/chunks/ssr/[root-of-the-server]__b1a50f04._.js:3:7155)
    at t (.next/server/chunks/ssr/[root-of-the-server]__b457ffcf._.js:1:2472)
Export encountered an error on /home/ui/HomePage, exiting the build.
```

### 원인

처음에는 TanStack Query 설정 문제로 보였지만, 실제 원인은 루트의 pages/ 디렉토리가 Next.js의 Pages Router로 인식된 것이었다.

프로젝트는 App Router 구조로 app/layout.ts를 사용하고 있었고, pages/는 “라우트”가 아니라 단순히 컴포넌트를 모아두는 폴더로 두고 있었다.

- app/page.tsx에서 pages/home/ui/HomePage.tsx를 import 해서 사용
- 하지만 Next.js는 루트의 pages/를 Pages Router로 인식하여
  pages/home/ui/HomePage.tsx를 /home/ui/HomePage 라우트로 자동 생성/빌드하려고 시도함
- 그 과정에서 해당 라우트는 app/layout.ts 트리(Provider가 적용되는 트리)를 타지 않게 되어,
  결과적으로 QueryClientProvider 없이 Query 훅이 실행되며 에러가 발생함

### 해결

pages/ 디렉토리가 라우팅 대상으로 인식되지 않도록 이름을 변경했다.

- pages/ → \_pages/
  > 컴포넌트 보관용 폴더는 pages/ 같은 예약 의미가 있는 디렉토리명을 피하고, src/pages 또는 src/ui, src/widgets 등으로 분리하는 것이 안전하다.

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

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string | number>) {
    const url = new URLSearchParams();
    for (const [k, v] of Object.entries(queryParams ?? {})) {
      url.set(k, String(v));
    }

    const query = url.toString();
    if (!query) return endpoint;

    return endpoint.includes('?') ? `${endpoint}&${query}` : `${endpoint}?${query}`;
  }

  private async safeJson(response: Response) {
    // 204 같은 케이스 + JSON이 아닌 응답 대비
    const contentType = response.headers.get('content-type') ?? '';
    if (response.status === 204 || !contentType.includes('application/json')) return null;

    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<TResult> {
    const url = this.buildUrl(endpoint, queryParams);

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'GET',
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...(init?.headers ?? {}),
        },
      });
    } catch (e) {
      throw new ApiError('네트워크 오류가 발생했습니다.', 0, e);
    }

    const data = await this.safeJson(response);

    if (!response.ok) {
      const serverMsg =
        data && typeof data === 'object' && 'error' in data ? String(data.error) : null;

      throw new ApiError(
        serverMsg ?? `요청 실패 (status: ${response.status})`,
        response.status,
        data,
      );
    }

    if (data === null) {
      throw new ApiError('서버 응답(JSON)을 파싱할 수 없습니다.', response.status);
    }

    return data as TResult;
  }
}

export const apiClient = new ApiClient('');

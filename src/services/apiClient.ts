type RequestOptions = {
  method?: string;
  body?: BodyInit | Record<string, any>;
  headers?: Record<string, string>;
  withAuth?: boolean;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

let accessToken: string | null = null;

const buildHeaders = (options: RequestOptions) => {
  const isFormData = options.body instanceof FormData;
  const baseHeaders: Record<string, string> = {};
  if (!isFormData) {
    baseHeaders['Content-Type'] = 'application/json';
  }
  if (options.headers) Object.assign(baseHeaders, options.headers);
  if (options.withAuth !== false && accessToken) {
    baseHeaders.Authorization = `Bearer ${accessToken}`;
  }
  return baseHeaders;
};

const normalizeBody = (body: RequestOptions['body']) => {
  if (!body) return undefined;
  if (body instanceof FormData) return body;
  return JSON.stringify(body);
};

export const apiClient = {
  setToken(token: string | null) {
    accessToken = token;
  },
  getToken() {
    return accessToken;
  },
  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, {
      method: options.method ?? 'GET',
      headers: buildHeaders(options),
      body: normalizeBody(options.body),
      credentials: 'include'
    });

    let payload: any = null;
    try {
      payload = await response.json();
    } catch {
      // ignore JSON parse errors
    }

    if (!response.ok) {
      const message =
        payload?.message || payload?.error || `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status);
    }

    return (payload?.data ?? payload) as T;
  }
};

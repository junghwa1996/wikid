'use client';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * API 기본 URL 설정
 * 환경 변수가 없는 경우를 대비해 빈 문자열을 기본값으로 설정
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * 토큰 응답 데이터의 타입 정의
 * API 응답에서 accessToken을 필수 문자열로 지정
 */
interface TokenResponse {
  accessToken: string;
}

type PublicEndpoints = {
  post: string[];
  get: string[];
};

/**
 * 토큰 인증이 필요 없는 API 경로 정의
 * POST: 인증 관련 엔드포인트 (/auth/*)
 * GET: 프로필, 게시글 목록, 댓글 조회 등 공개 엔드포인트
 * as const를 사용하여 리터럴 타입으로 고정
 */
const PUBLIC_ENDPOINTS: PublicEndpoints = {
  post: ['/auth/signUp', '/auth/signIn', '/auth/refresh-token'],
  get: [
    '/profiles',
    '/profiles/',
    '/articles',
    '/articles/*/comments', // 와일드카드 패턴 사용
  ],
};

/**
 * 커스텀 axios 인스턴스 생성
 * 기본 설정:
 * - baseURL: 환경 변수에서 가져온 API 기본 URL
 * - headers: JSON 통신을 위한 기본 헤더 설정
 */
export const instance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * 주어진 URL이 공개 엔드포인트인지 확인하는 함수
 * @param url - 요청 URL
 * @param method - HTTP 메서드
 * @returns 공개 엔드포인트 여부
 */
const isPublicEndPoint = (
  url: string | undefined,
  method: string | undefined
): boolean => {
  if (typeof url !== 'string' || url.length === 0) return false;
  if (typeof method !== 'string' || method.length === 0) return false;

  const upperMethod = method.toUpperCase();

  // POST 요청의 경우 auth 관련 엔드포인트만 체크
  if (upperMethod === 'POST') {
    return PUBLIC_ENDPOINTS.post.includes(url);
  }

  // GET 요청의 경우 패턴 매칭 수행
  if (upperMethod === 'GET') {
    // 등록된 패턴과 URL 매칭 검사
    for (const pattern of PUBLIC_ENDPOINTS.get) {
      if (pattern.includes('*')) {
        // 와일드카드(*) 패턴 처리
        const regex = new RegExp('^' + pattern.replace('*', '[^/]+') + '$');
        if (regex.test(url)) return true;
      } else if (url === pattern) {
        // 정확한 경로 매칭
        return true;
      }
    }

    // 특수 케이스 처리
    if (url === '/articles') return true; // 게시글 목록 조회는 public
    if (url.startsWith('/profiles/')) return true; // 프로필 관련 모든 요청은 public
  }

  return false; // 그 외 모든 요청은 인증 필요
};

/**
 * 토큰 갱신 함수
 * 저장된 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받음
 * @returns 새로운 액세스 토큰 또는 실패 시 null
 */
const refreshToken = async (): Promise<string | null> => {
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (typeof storedRefreshToken !== 'string') {
    // console.error('Invalid refresh token');
    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    return null;
  }

  if (!storedRefreshToken) {
    // console.error('No refresh token available');
    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    return null;
  }

  try {
    // 리프레시 토큰으로 새 액세스 토큰 요청
    const response: AxiosResponse<TokenResponse> = await axios.post(
      `${baseURL}/auth/refresh-token`,
      { refreshToken: storedRefreshToken }
    );

    const newAccessToken = response.data.accessToken;

    // 응답 데이터 타입 검증
    if (typeof newAccessToken !== 'string') {
      throw new Error('Invalid access token received');
    }

    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    // console.error('Failed to refresh token:', error);
    // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    window.location.href = '/login';
    return null;
  }
};

// 브라우저 환경에서만 인터셉터 설정
if (typeof window !== 'undefined') {
  /**
   * Request 인터셉터
   * 요청 전송 전에 인증 토큰을 헤더에 추가
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      // URL과 method가 존재하고 public endpoint인 경우
      if (
        typeof config.url === 'string' &&
        typeof config.method === 'string' &&
        isPublicEndPoint(config.url, config.method)
      ) {
        return config;
      }

      const token = localStorage.getItem('accessToken');

      // 토큰이 있는 경우에만 토큰 추가
      if (token !== null && typeof token === 'string') {
        config.headers.set('Authorization', `Bearer ${token}`);
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  /**
   * Response 인터셉터
   * 401 에러 발생 시 토큰 갱신 후 요청 재시도
   */
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      // 원본 요청 설정 타입 보장
      const originalRequest = error.config as
        | (AxiosRequestConfig & { _retry?: boolean })
        | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // 공개 엔드포인트는 토큰 갱신 처리하지 않음
      if (
        typeof originalRequest.url === 'string' &&
        originalRequest.url.length > 0 &&
        typeof originalRequest.method === 'string' &&
        originalRequest.method.length > 0 &&
        isPublicEndPoint(originalRequest.url, originalRequest.method)
      ) {
        return Promise.reject(error);
      }

      // 토큰 만료 에러(401)이고 아직 재시도하지 않은 경우
      if (error.response?.status === 401 && originalRequest._retry !== true) {
        originalRequest._retry = true;
        const newToken = await refreshToken();

        // 새 토큰으로 요청 재시도
        if (
          typeof newToken === 'string' &&
          newToken.length > 0 &&
          originalRequest.headers
        ) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );
}

export default instance;

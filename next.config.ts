import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'], // 허용할 이미지 도메인 추가
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'ifh.cc',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

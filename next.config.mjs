/** @type {import('next').NextConfig} */
import { createProxyMiddleware } from 'http-proxy-middleware';

export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.theparcel.com.ng/api/v1/:path*', // Proxy to API
      },
    ];
  },
  images: {
    domains: ['unsplash.com'],
  },
};
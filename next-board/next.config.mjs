/** @type {import('next').NextConfig} */
const nextConfig = {
  // 구버전
  // images: {
  //   domains: ['lh3.googleusercontent.com']
  // },
  // 최신버전
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;

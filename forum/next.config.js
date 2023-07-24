/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: 'https',
  //         hostname: 'avatars.githubusercontent.com',
  //         port: '',
  //         pathname: '/u/**'
  //       }
  //     ]
  //   },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**'
      }
    ]
  },
  swcMinify: true,
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;

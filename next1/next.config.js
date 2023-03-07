/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: false,

  //페이지 Redirect 방법
  //:path와 *사용법 숙지
  async redirects(){
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false
      }
    ]
  },
  //redirects와 다름 -> redirects 기능과 비슷하지만 url을 반환하지 않음
  //source와 destination의 movie뒤에 id값을 추가해야함 -> /movie/{movie_id}?api_key...
  async rewrites(){
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      }
    ]
  }
}

module.exports = nextConfig

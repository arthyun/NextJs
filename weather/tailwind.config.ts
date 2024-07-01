import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        sunny: "url('/public/sunny.jpg')",
        foggy: "url('/public/foggy.jpg')",
        foggyandsunny: "url('/public/foggyandsunny.jpg')",
        rain: "url('/public/rain.jpg')"
      }
    }
  },
  plugins: []
};
export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#000000',
        surface: {
          subtle: '#050505',
          DEFAULT: '#0a0a0a',
          card: '#0a0a0a',
          elevated: '#111111',
          hover: '#171717',
          active: '#202020',
        },
        border: {
          subtle: '#1f1f1f',
          DEFAULT: '#262626',
          hover: '#383838',
          active: '#52525b',
        },
        text: {
          primary: '#ededed',
          secondary: '#a1a1aa',
          muted: '#71717a',
          dim: '#52525b',
        },
        accent: {
          DEFAULT: '#0070f3',
          blue: '#0070f3',
          emerald: '#00df72',
          green: '#00df72',
          amber: '#f5a623',
          yellow: '#f5a623',
          cyan: '#38bdf8',
          purple: '#c084fc',
          rose: '#f87171',
        },
      },
      fontFamily: {
        sans: ['Geist Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'vercel-card': '0 0 0 1px #262626',
        'vercel-card-hover': '0 0 0 1px #404040, 0 8px 24px -4px rgba(0, 0, 0, 0.5)',
        'vercel-glow': '0 0 50px -10px rgba(120, 119, 198, 0.15)',
      },
    },
  },
  plugins: [],
};

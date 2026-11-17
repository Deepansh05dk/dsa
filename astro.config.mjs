import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://deepansh05dk.github.io',
  base: '/dsa',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react'],
    },
  },
});

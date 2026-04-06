import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // tokens.css from @rishikeshjoshi-morpheus/ui contains CSS vars with '/' in names
    // (e.g. --osmos-sizes-1/2) which lightningcss (Vite 8 default) rejects — use esbuild instead
    cssMinify: false,
  },
});

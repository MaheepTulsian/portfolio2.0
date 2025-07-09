import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/MaheepTulsian.github.io/",
  plugins: [react()],
  assetsInclude: ['**/*.HEIC', '**/*.heic'],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

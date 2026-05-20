import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Volitelne: alias pro importy
  resolve: {
    alias: { '@': '/src' },
  },
});

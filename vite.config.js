import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'personal-site-felipe-production.up.railway.app',
      'felipemaia.dev',
      'www.felipemaia.dev',
    ],
  },
});

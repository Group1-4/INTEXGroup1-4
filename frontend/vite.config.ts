import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline'; /* Adjust 'unsafe-inline' as needed, consider nonces or hashes */
        style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; /* Bootstrap CSS might come from a CDN */
        img-src 'self' data: blob:;
        font-src 'self' https://cdn.jsdelivr.net; /* Bootstrap fonts might come from a CDN */
        connect-src 'self' https://localhost:4000;
        media-src 'self' blob:; /* If you use video or audio blobs */
        object-src 'none';
        frame-ancestors 'self';
        upgrade-insecure-requests;
      `,
    },
  },
});
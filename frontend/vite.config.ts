import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: {
      'Content-Security-Policy-Report-Only': 
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: blob:; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self' https://localhost:4000; media-src 'self' blob:; object-src 'none'; frame-ancestors 'self'; upgrade-insecure-requests; report-uri /csp-report;",
    },
  },
});

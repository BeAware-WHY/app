import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Setup a proxy for API requests to avoid CORS issues
      // This proxies requests from /api to https://api.deafassistant.com
      '/api': {
        target: 'https://api.deafassistant.com', // Target API server
        changeOrigin: true, // Change the origin to match the target server
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix before making the request
      },
    },
  },
});

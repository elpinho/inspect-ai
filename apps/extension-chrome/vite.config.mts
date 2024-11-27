import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        devtools: 'src/devtools.html',
        panel: 'src/panel.html',
        main: 'index.html'
      }
    }
  }
});

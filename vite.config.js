import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    // Plugin để copy thư mục voice
    {
      name: 'copy-voice-assets',
      writeBundle() {
        const voiceSource = path.resolve(__dirname, 'assets/voice');
        const voiceDest = path.resolve(__dirname, 'dist/assets/voice');
        
        if (existsSync(voiceSource)) {
          mkdirSync(voiceDest, { recursive: true });
          const fs = require('fs');
          const files = fs.readdirSync(voiceSource);
          files.forEach(file => {
            copyFileSync(
              path.join(voiceSource, file),
              path.join(voiceDest, file)
            );
          });
          console.log('Voice assets copied to dist');
        }
      }
    }
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    copyPublicDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: ['..']
    }
  },
  publicDir: 'public',
});

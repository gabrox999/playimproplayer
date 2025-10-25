import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/playimproplayer/' : '/',
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})

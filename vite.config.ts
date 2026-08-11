import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        engine: resolve(process.cwd(), 'engine.html'),
        fnbpulse: resolve(process.cwd(), 'fnbpulse.html'),
        about: resolve(process.cwd(), 'about.html'),
        resources: resolve(process.cwd(), 'resources.html'),
      },
    },
  },
})

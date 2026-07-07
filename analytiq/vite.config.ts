import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
  esbuild: {
    // Hii inazuia TypeScript errors zote wakati wa build
    logOverride: { 'ts-unused': 'silent' }
  }
})
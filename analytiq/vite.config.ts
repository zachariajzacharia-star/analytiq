import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Hii inazuia TypeScript kuangalia unused variables wakati wa build
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore unused variable warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT' || 
            warning.code === 'UNUSED_VAR' ||
            warning.message.includes('is declared but its value is never read')) {
          return
        }
        warn(warning)
      }
    }
  }
})
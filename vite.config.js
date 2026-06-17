import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/India-Temple-Heritage-Pilgrimage-Information-Portal/',
  server: {
    port: 5180,
    strictPort: true,
  },
}))


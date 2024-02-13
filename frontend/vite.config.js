import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-todo-app-rbk4.onrender.com',
        changeOrigin: true
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
<<<<<<< HEAD
    react(),
=======
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
>>>>>>> main
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})

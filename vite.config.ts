import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:  '/task-management-mui/', 
  plugins: [react()],
  build: {
    outDir: 'dist', 
    sourcemap: false, 
},
// server: {
//   https: true,
//   proxy: {
//     '/api': {
//       target: 'https://task-management-nest.onrender.com', 
//       changeOrigin: true, 
//       secure: true, 
//       rewrite: (path) => path.replace(/^\/api/, ''), 
//     },
//   },
// },
})

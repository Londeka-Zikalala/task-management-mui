import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/task-management-mui/', 
  plugins: [react()],
  build: {
    outDir: 'dist', 
    sourcemap: false, 
}
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//  repo name:
const repoName = 'Tes-Insurance-Agency'

export default defineConfig({
  plugins: [react()],
  base: '/', // needed so assets resolve on GH Pages
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    open: true
  }
})

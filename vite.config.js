import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// replace with your repo name:
const repoName = 'Tes-Insurance-Agency'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`, // needed so assets resolve on GH Pages
})

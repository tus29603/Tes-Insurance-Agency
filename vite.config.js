import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//  repo name:
const repoName = 'Tes-Insurance-Agency'

export default defineConfig({
  plugins: [react()],
  base: '/' // needed so assets resolve on GH Pages
})

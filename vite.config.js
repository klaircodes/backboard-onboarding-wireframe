import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://klaircodes.github.io/backboard-onboarding-wireframe/ on GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: '/backboard-onboarding-wireframe/',
})

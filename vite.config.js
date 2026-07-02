import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Serve under https://USERNAME.github.io/portfolio/ (GitHub Pages project site)
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
})

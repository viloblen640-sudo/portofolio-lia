import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Untuk GitHub Pages, ganti base dengan '/nama-repo/'
export default defineConfig({ plugins: [react(), tailwindcss()], base: '/' })

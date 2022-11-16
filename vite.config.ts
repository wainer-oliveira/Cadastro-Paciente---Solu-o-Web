import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import glob from 'glob'

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, ''),
  build: {
    outDir: path.join(__dirname, 'build'),
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, "", "*.html")),
    }
  },
  plugins: [react()]
})

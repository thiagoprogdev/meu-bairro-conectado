import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Replaced `process.cwd()` with `'.'` to resolve TypeScript errors related to missing Node.js type definitions.
  // This avoids using the `process` global, allowing the removal of the `/// <reference types="node" />` directive
  // which was also causing an error. In this context, `'.'` is functionally equivalent for locating .env files.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      'process.env': JSON.stringify({
        API_KEY: env.VITE_API_KEY
      })
    },
    build: {
      target: 'es2015', // Garante compatibilidade com iOS mais antigo
    }
  }
})

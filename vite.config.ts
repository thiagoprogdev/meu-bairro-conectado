import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// FIX: Updated config to load environment variables and define process.env.API_KEY for the client,
// adhering to @google/genai guidelines. Assumes API key is in a .env file as VITE_API_KEY.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env': JSON.stringify({
        API_KEY: env.VITE_API_KEY
      })
    }
  }
})

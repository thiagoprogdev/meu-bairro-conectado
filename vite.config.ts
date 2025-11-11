import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: './', // 👈 garante que o app funcione na Vercel e local
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env': {}, // 👈 evita erro "process is not defined"
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 👈 aponta para a pasta "src"
      },
    },
    build: {
      chunkSizeWarningLimit: 2000, // Aumenta o limite para 2 MB
      outDir: 'dist', // 👈 garante compatibilidade com Vercel
    },
  };
});

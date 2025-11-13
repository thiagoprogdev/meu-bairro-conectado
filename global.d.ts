// FIX: Updated type definitions for process.env to align with Vite's environment variable injection.
// This provides correct TypeScript types for the shimmed process.env object.
// Este arquivo é usado para declarar tipos globais para o TypeScript.
// Ele define o objeto `process.env` injetado pelo Vite para que o serviço Gemini possa usá-lo.

declare var process: {
  env: {
    API_KEY: string | undefined;
  };
};

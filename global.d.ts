// Este arquivo é usado para declarar tipos globais para o TypeScript.
// Ele corrige o erro "Cannot find type definition file for 'node'"
// definindo manualmente o objeto `process` que o serviço Gemini usa.

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
  }
}

// FIX: Removed the `declare var process` block that was causing a redeclaration error.
// The `process` variable is likely already typed by a dependency. Augmenting
// `NodeJS.ProcessEnv` is sufficient to add types for environment variables.

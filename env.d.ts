declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GEMINI_API_KEY: string;
    }
  }
}

export {};

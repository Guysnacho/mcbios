declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production" | "test";

      NEXT_PUBLIC_SUPABASE_PUB_KEY: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_ORG_ID: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_SUITE_URL?: string;
      NEXT_PUBLIC_ANALYTICS_KEY: string;
    }
  }
}

export {};

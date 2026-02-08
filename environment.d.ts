declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production" | "test";

      CONF_REGISTRATION_POSTDOC: string;
      CONF_REGISTRATION_POSTDOC_PRODUCT: string;
      CONF_REGISTRATION_PROFESSIONAL: string;
      CONF_REGISTRATION_PROFESSIONAL_PRODUCT: string;
      CONF_REGISTRATION_STUDENT: string;
      CONF_REGISTRATION_STUDENT_PRODUCT: string;
      EB_CONF_REGISTRATION_POSTDOC: string;
      EB_CONF_REGISTRATION_POSTDOC_PRODUCT: string;
      EB_CONF_REGISTRATION_PROFESSIONAL: string;
      EB_CONF_REGISTRATION_PROFESSIONAL_PRODUCT: string;
      EB_CONF_REGISTRATION_STUDENT: string;
      EB_CONF_REGISTRATION_STUDENT_PRODUCT: string;
      NEXT_PUBLIC_LATE_REGISTRATION: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_SUPABASE_PUB_KEY: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      POSTDOC: string;
      POSTDOC_PRODUCT: string;
      PROFESSIONAL: string;
      PROFESSIONAL_PRODUCT: string;
      SERVER_RESEND_KEY: string;
      STRIPE_SECRET_KEY: string;
      STUDENT: string;
      STUDENT_PRODUCT: string;
      SUPABASE_SERVER_KEY: string;
      SUPABASE_SIGNING_KEY: string;
      NEXT_PUBLIC_ORG_ID: string;
    }
  }
}

export {};

declare namespace NodeJS {
  interface ProcessEnv {
    SERVER: string;
    DATABASE_HOST: string;
    PORT: string;
    DATABASE_HOST: string;
    DATABASE_USER: string;
    DATABASE_NAME: string;
    DATABASE_PASS: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    COOKIE_SECRET: string;
    PAGINATE_LIMIT: string;
    CACHE_EXPIRATION_TIME: string;
  }
}
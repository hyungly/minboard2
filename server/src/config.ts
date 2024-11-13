// config.ts
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET이 환경 변수에 없습니다."); })(),
  googleClientID: process.env.GOOGLE_CLIENT_ID || (() => { throw new Error("GOOGLE_CLIENT_ID가 환경 변수에 없습니다."); })(),
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || (() => { throw new Error("GOOGLE_CLIENT_SECRET이 환경 변수에 없습니다."); })(),
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  cookieSecret: process.env.COOKIE_SECRET || (() => { throw new Error("COOKIE_SECRET이 환경 변수에 없습니다."); })(),
};

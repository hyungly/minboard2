import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

dotenv.config(); // 환경 변수 로드

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

// 기본 인증과 OAuth2.0 모두 지원하도록 설계
const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: '/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
  // 자동으로 생성할 비밀번호 (Google OAuth 로그인 시 실제 비밀번호는 필요 없음)
  const password = await bcrypt.hash(profile.id, 10);

  // 데이터베이스에서 사용자 찾기 또는 생성
  const user = await prisma.user.upsert({
    where: { email: profile.emails[0].value },
    update: {},
    create: {
      username: profile.displayName,
      email: profile.emails[0].value,
      password: password,
    },
  });
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

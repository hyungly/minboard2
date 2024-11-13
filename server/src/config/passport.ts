// /config/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback',
    },
    async (token, tokenSecret, profile, done) => {
      try {
        // Google OAuth 사용자를 위한 자동 비밀번호 생성
        const password = await bcrypt.hash(profile.id, 10);

        // 사용자를 데이터베이스에서 조회 또는 생성
        const user = await prisma.user.upsert({
          where: { email: profile.emails[0].value },
          update: {},
          create: {
            username: profile.displayName,
            email: profile.emails[0].value,
            password,
          },
        });
        return done(null, user);
      } catch (error) {
        // 에러 발생 시 콜백에 전달
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

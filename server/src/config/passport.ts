import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

dotenv.config(); // 환경 변수 로드

//기본인증과 OAuth2.0 모두 지원하도록 설계

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback',
    },
    async (token, tokenSecret, profile, done) => {
      const user = await prisma.user.upsert({
        where: { email: profile.emails[0].value },
        update: {},
        create: {
          username: profile.displayName,
          email: profile.emails[0].value,
        },
      });
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import './config/passport'; // 패스포트 설정

// 라우터 임포트
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import profileRoutes from './routes/profileRoutes'; // 추가된 부분
import authRoutes from './routes/authRoutes'; // 추가된 부분

// 환경 변수 로드
dotenv.config();

// Express 애플리케이션 초기화
const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(passport.initialize());

// Google OAuth2.0 전략 설정
const prisma = new PrismaClient();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback',
    },
    async (token, tokenSecret, profile, done) => {
      const password = await bcrypt.hash(profile.id, 10);
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
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Server is running and API is live!');
});

// API 라우트 설정
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/profile', profileRoutes); // 추가된 부분
app.use('/api/auth', authRoutes); // 추가된 부분

// 에러 핸들링 미들웨어
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

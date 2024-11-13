// app.ts
import dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });

import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import './config/passport'; // 패스포트 설정 파일
import { config } from './config'; // 환경 변수 관리 파일에서 config 가져오기
import { errorHandler } from './middlewares/errorHandler'; // 에러 핸들링 미들웨어

// 라우터 임포트
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import profileRoutes from './routes/profileRoutes';
import authRoutes from './routes/authRoutes';

// Express 애플리케이션 초기화
const app = express();
const PORT = config.port; // config에서 포트 가져오기

// 미들웨어 설정
app.use(express.json());
app.use(cookieParser(config.cookieSecret)); // config에서 cookieSecret 가져오기
app.use(passport.initialize());

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Server is running and API is live!');
});

// API 라우트 설정
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);

// 에러 핸들링 미들웨어
app.use(errorHandler);

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

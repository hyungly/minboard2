import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/passport'; // 패스포트 설정 파일 불러오기
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Server is running and API is live!');
});

// API 라우트 설정
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

export default app;

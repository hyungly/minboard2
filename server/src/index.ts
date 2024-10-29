import dotenv from 'dotenv';

// 실행 환경에 맞게 환경 변수 파일을 로드
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

import express from 'express';
import passport from '../src/config/passport'; // 예시로 추가

const app = express();

// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';  // 환경 변수

// JWT 인증 미들웨어
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];  // token 추출

  if (!token) {
    res.status(403).json({ message: 'Access Denied' }); // 토큰 없으면 접근 거부
    return;  // 여기서 함수를 종료하여 더 이상의 처리를 하지 않도록 합니다.
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid or expired token' }); // 토큰 오류 시
      return;  // 오류 발생 시 함수 종료
    }
    // JWT에서 사용자 정보 추출하여 req.user에 추가
    (req as any).user = decoded;
    next();  // 다음 미들웨어로 이동
  });
};

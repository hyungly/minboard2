import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config'; // 환경 변수

// Request 객체 확장: 사용자 정보를 포함
interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    username: string;
    email: string;
    role: string;
  };
}

// 토큰 추출 함수
const extractToken = (req: Request): string | null => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return req.cookies.token || null; // 쿠키에서 토큰 추출
};

// JWT 인증 미들웨어
export const authenticateJWT = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(403).json({ message: 'Access Denied: No token provided' });
      return; // 함수 종료
    }

    // jwt.verify를 비동기로 처리
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number;
      username: string;
      email: string;
      role: string;
    };
    req.user = decoded; // 사용자 정보 추가
    next(); // 다음 미들웨어로 이동
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

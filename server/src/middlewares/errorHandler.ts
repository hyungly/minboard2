// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number; // 상태 코드를 추가로 지정할 수 있도록 확장
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack); // 개발 중에는 스택 트레이스 출력

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'development'
      ? err.message
      : '서버에 오류가 발생했습니다.';

  res.status(statusCode).json({ message });
};

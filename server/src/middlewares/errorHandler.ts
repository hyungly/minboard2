// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: err.message || '서버에 오류가 발생했습니다.' });
};

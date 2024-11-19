// authController.ts
import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { CreateUserDTO, LoginUserDTO } from '../DTOs/userDTO';
import { handleGoogleCallback } from '../services/authService';

// 사용자 등록
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: CreateUserDTO = req.body;
    const newUser = await registerUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// 사용자 로그인
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const credentials: LoginUserDTO = req.body;
    const token = await loginUser(credentials);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

//Google 콜백
export const googleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user = req.user as any; // OAuth 인증 후 전달된 사용자 정보
    const token = handleGoogleCallback(user); // 서비스 호출
    res.json({ token });
  } catch (error) {
    next(new Error('Google authentication failed.'));
  }
};

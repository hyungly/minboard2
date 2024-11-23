import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyCode,
} from '../services/authService';
import { CreateUserDTO, LoginUserDTO } from '../DTOs/userDTO';
import { handleGoogleCallback } from '../services/authService';
import { User } from '@prisma/client';

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
    console.error('Error during user registration:', error);
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
    console.error('Error during user login:', error);
    next(error);
  }
};

// Google 콜백
export const googleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user = req.user as User;
    const token = handleGoogleCallback(user);
    res.json({ token });
  } catch (error) {
    console.error('Google authentication failed:', error);
    next(new Error('Google authentication failed.'));
  }
};

// 인증번호 발송
export const handleSendVerificationCode = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  try {
    const verificationCode = await sendVerificationCode(email);
    res.status(200).json({ code: verificationCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

// 인증번호 확인
export const handleVerifyCode = (req: Request, res: Response) => {
  const { email, inputCode } = req.body;

  try {
    const isValid = verifyCode(email, inputCode);
    if (isValid) {
      res.status(200).json({ message: 'Verification successful' });
    } else {
      res.status(400).json({ message: 'Verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Verification process failed' });
  }
};

import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyCode,
  handleForgotPasswordRequest,
  handlePasswordReset,
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
    res.status(400).json({ message: 'User registration failed.' });
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
    res.status(401).json({ message: 'Invalid credentials.' });
    next(error);
  }
};

// 사용자 로그아웃
export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie('token'); // 쿠키에서 토큰 삭제
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ message: 'Logout failed.' });
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
    res.status(500).json({ message: 'Google authentication failed.' });
    next(error);
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
    res.status(200).json({
      message: 'Verification code sent successfully.',
      code: verificationCode,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};

// 인증번호 확인
export const handleVerifyCode = (req: Request, res: Response) => {
  const { email, verificationCode } = req.body;

  try {
    const isValid = verifyCode(email, verificationCode);
    if (isValid) {
      res.status(200).json({ message: 'Verification successful.' });
    } else {
      res.status(400).json({ message: 'Invalid verification code.' });
    }
  } catch (error) {
    console.error('Verification process failed:', error);
    res.status(500).json({ message: 'Verification process failed.' });
  }
};

// 비밀번호 재설정 요청
export const handleForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await handleForgotPasswordRequest(email);
    res.status(200).json({ message: 'Password reset link sent.' });
  } catch (error) {
    console.error('Failed to send password reset link:', error);
    res.status(500).json({ message: 'Failed to send password reset link.' });
  }
};

// 비밀번호 재설정
export const handleResetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    await handlePasswordReset(token, newPassword);
    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Failed to reset password:', error);
    res.status(500).json({ message: 'Failed to reset password.' });
  }
};

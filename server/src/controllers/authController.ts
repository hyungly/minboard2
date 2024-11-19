// authController.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { config } from '../config';

const prisma = new PrismaClient();

// 사용자 등록
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    next(new Error('User registration failed.'));
  }
};

// 사용자 로그인
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: process.env.JWT_EXPIRY || '1h',
    });
    res.json({ token });
  } catch (error) {
    next(new Error('Authentication failed.'));
  }
};

// Google OAuth 콜백 핸들러
export const googleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: process.env.JWT_EXPIRY || '1h',
    });
    res.json({ token });
  } catch (error) {
    next(new Error('Google authentication failed.'));
  }
};

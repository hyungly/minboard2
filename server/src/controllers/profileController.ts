import { Request, Response, NextFunction } from 'express';
import { getUserProfile, updateUserProfile } from '../services/profileService';
import { User } from '@prisma/client';

// 타입 정의를 명시적으로 설정
interface AuthenticatedRequest extends Request {
  user: User; // 사용자 객체를 User 타입으로 설정
}

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user.id; // req.user는 이제 명시적으로 User 타입

  try {
    // userId가 string일 경우 number로 변환
    const userProfile = await getUserProfile(Number(userId));
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user.id; // req.user는 이제 명시적으로 User 타입
  const updateData = req.body;

  try {
    // userId가 string일 경우 number로 변환
    const updatedProfile = await updateUserProfile(Number(userId), updateData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

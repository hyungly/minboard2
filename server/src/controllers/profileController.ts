// profileController.ts
import { Request, Response, NextFunction } from 'express';
import { getUserProfile, updateUserProfile } from '../services/profileService';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = (req as any).user.userId;

  try {
    // userId가 string일 경우 number로 변환
    const userProfile = await getUserProfile(Number(userId));
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = (req as any).user.userId;
  const updateData = req.body;

  try {
    // userId가 string일 경우 number로 변환
    const updatedProfile = await updateUserProfile(Number(userId), updateData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

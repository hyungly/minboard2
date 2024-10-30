// profileController.ts
import { Request, Response, NextFunction } from 'express';
import { getUserProfile, updateUserProfile } from '../services/profileService';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = (req as any).user.userId;

  try {
    const userProfile = await getUserProfile(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = (req as any).user.userId;
  const updateData = req.body;

  try {
    const updatedProfile = await updateUserProfile(userId, updateData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

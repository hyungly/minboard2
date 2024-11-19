// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import {
  getUserById,
  getAllUsers,
  updateUserProfile,
  removeUser,
} from '../services/userService';
import { UpdateUserDTO } from '../DTOs/userDTO';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const userData: UpdateUserDTO = req.body;
    const updatedUser = await updateUserProfile(userId, userData);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id, 10);
    await removeUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

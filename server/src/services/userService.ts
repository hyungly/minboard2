// src/services/userService.ts
import {
  findUserById,
  findAllUsers,
  updateUser,
  deleteUser,
} from '../models/userModel';
import { UserResponseDTO, UpdateUserDTO } from '../DTOs/userDTO';

export const getUserById = async (userId: number): Promise<UserResponseDTO> => {
  const user = await findUserById(userId);
  if (!user) throw new Error('User not found');
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

export const getAllUsers = async (): Promise<UserResponseDTO[]> => {
  const users = await findAllUsers();
  return users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  }));
};

export const updateUserProfile = async (
  userId: number,
  userData: UpdateUserDTO
): Promise<UserResponseDTO> => {
  const updatedUser = await updateUser(userId, userData);
  if (!updatedUser) throw new Error('User update failed');
  return {
    id: updatedUser.id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
  };
};

export const removeUser = async (userId: number): Promise<void> => {
  const result = await deleteUser(userId);
  if (!result) throw new Error('User deletion failed');
};

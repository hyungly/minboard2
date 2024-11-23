// src/models/userModel.ts
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserById = async (userId: number): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id: userId } });
};

export const findAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const updateUser = async (
  userId: number,
  userData: Partial<User>
): Promise<User | null> => {
  return await prisma.user.update({
    where: { id: userId },
    data: userData,
  });
};

export const deleteUser = async (userId: number): Promise<User | null> => {
  return await prisma.user.delete({ where: { id: userId } });
};

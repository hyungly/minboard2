import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true, nickname: true, profile_image: true }
  });
  return user;
};

export const updateUserProfile = async (userId: number, updateData: any) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData
  });
  return updatedUser;
};

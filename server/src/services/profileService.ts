// profileService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserProfile = async (userId: string | number) => {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId; // 문자열이면 숫자로 변환

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, email: true, nickname: true, profile_image: true }
  });

  return user;
};

export const updateUserProfile = async (userId: string | number, updateData: any) => {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId; // 문자열이면 숫자로 변환

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData
  });

  return updatedUser;
};

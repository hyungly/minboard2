import { PrismaClient, User } from '@prisma/client';
import { UpdateUserDTO, UserProfileDTO } from '../DTOs/userDTO';

const prisma = new PrismaClient();

export const getUserProfile = async (
  userId: string | number
): Promise<UserProfileDTO | null> => {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId; // 문자열이면 숫자로 변환

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      nickname: true,
      profileImage: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    nickname: user.nickname,
    profileImage: user.profileImage,
  };
};

export const updateUserProfile = async (
  userId: string | number,
  updateData: UpdateUserDTO
): Promise<User> => {
  const id = typeof userId === 'string' ? parseInt(userId, 10) : userId; // 문자열이면 숫자로 변환

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return updatedUser;
};

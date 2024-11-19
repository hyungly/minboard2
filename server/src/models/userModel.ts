import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      role: true,
    }, // role 추가
  });
  return user;
};

export const createUser = async (userData: any): Promise<User> => {
  return prisma.user.create({ data: userData });
};

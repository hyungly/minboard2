// authModel.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 이메일로 사용자 찾기
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

// 사용자 생성
export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  return prisma.user.create({ data: userData });
};

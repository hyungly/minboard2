// commentModel.ts
import { PrismaClient, Comment } from '@prisma/client';

const prisma = new PrismaClient();

export const createComment = async (commentData: any): Promise<Comment> => {
  return prisma.comment.create({ data: commentData });
};

export const findCommentById = async (id: number): Promise<Comment | null> => {
  return prisma.comment.findUnique({ where: { id } });
};

export const updateComment = async (id: number, updateData: any): Promise<Comment> => {
  return prisma.comment.update({
    where: { id },
    data: updateData,
  });
};

export const deleteComment = async (id: number): Promise<Comment> => {
  return prisma.comment.delete({ where: { id } });
};

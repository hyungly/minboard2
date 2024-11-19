//postModel.ts
import { PrismaClient, Post } from '@prisma/client';
import { CreatePostDTO, UpdatePostDTO } from '../DTOs/postDTO';

const prisma = new PrismaClient();

export const createPost = async (postData: CreatePostDTO): Promise<Post> => {
  return prisma.post.create({ data: postData });
};

export const findPostById = async (id: number): Promise<Post | null> => {
  return prisma.post.findUnique({ where: { id } });
};

export const updatePost = async (
  id: number,
  updateData: UpdatePostDTO
): Promise<Post> => {
  return prisma.post.update({
    where: { id },
    data: updateData,
  });
};

export const deletePost = async (id: number): Promise<Post> => {
  return prisma.post.delete({ where: { id } });
};

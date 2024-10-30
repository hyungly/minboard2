import { CreatePostDTO, UpdatePostDTO, PostResponseDTO } from '../DTOs/postDTO';
import { createPost, findPostById, updatePost, deletePost } from '../models/postModel';

export const addPost = async (postData: CreatePostDTO): Promise<PostResponseDTO> => {
  const newPost = await createPost(postData);
  return newPost;
};

export const getPost = async (id: number): Promise<PostResponseDTO> => {
  const post = await findPostById(id);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

export const editPost = async (id: number, updateData: UpdatePostDTO): Promise<PostResponseDTO> => {
  const updatedPost = await updatePost(id, updateData);
  return updatedPost;
};

export const removePost = async (id: number): Promise<void> => {
  await deletePost(id);
};

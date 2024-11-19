import { CreatePostDTO, UpdatePostDTO, PostResponseDTO } from '../DTOs/postDTO';
import {
  createPost,
  findPostById,
  updatePost,
  deletePost,
} from '../models/postModel';

export const addPost = async (
  postData: CreatePostDTO
): Promise<PostResponseDTO> => {
  const newPost = await createPost({
    ...postData,
  });

  // PostResponseDTO에 필요한 필드 추가
  return {
    ...newPost,
    likesCount: 0, // 새 게시물은 기본적으로 좋아요 수가 0
    status: 'active', // 새 게시물의 기본 상태
  };
};

export const getPost = async (id: number): Promise<PostResponseDTO> => {
  const post = await findPostById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  // PostResponseDTO에 필요한 필드 추가
  return {
    ...post,
    likesCount: 0, // 실제 likesCount 값이 없을 경우 기본값
    status: 'active', // 실제 상태 값이 없을 경우 기본값
  };
};

export const editPost = async (
  id: number,
  updateData: UpdatePostDTO
): Promise<PostResponseDTO> => {
  const updatedPost = await updatePost(id, updateData);

  // PostResponseDTO에 필요한 필드 추가
  return {
    ...updatedPost,
    likesCount: 0, // 실제 데이터가 없다면 기본값 제공
    status: 'active', // 필요에 따라 기본값 설정
  };
};

export const removePost = async (id: number): Promise<void> => {
  const post = await findPostById(id);
  if (!post) {
    throw new Error('Post not found');
  }
  await deletePost(id);
};

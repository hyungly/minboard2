import { CreateCommentDTO, UpdateCommentDTO, CommentResponseDTO } from '../DTOs/commentDTO';
import { createComment, findCommentById, updateComment, deleteComment } from '../models/commentModel';

export const addComment = async (commentData: CreateCommentDTO): Promise<CommentResponseDTO> => {
  const newComment = await createComment(commentData);
  return newComment;
};

export const getComment = async (id: number): Promise<CommentResponseDTO> => {
  const comment = await findCommentById(id);
  if (!comment) {
    throw new Error('Comment not found');
  }
  return comment;
};

export const editComment = async (id: number, updateData: UpdateCommentDTO): Promise<CommentResponseDTO> => {
  const updatedComment = await updateComment(id, updateData);
  return updatedComment;
};

export const removeComment = async (id: number): Promise<void> => {
  await deleteComment(id);
};

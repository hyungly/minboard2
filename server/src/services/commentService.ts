//commentService.ts
import {
  CreateCommentDTO,
  UpdateCommentDTO,
  CommentResponseDTO,
} from '../DTOs/commentDTO';
import {
  createComment,
  findCommentById,
  updateComment,
  deleteComment,
} from '../models/commentModel';

export const addComment = async (
  commentData: CreateCommentDTO
): Promise<CommentResponseDTO> => {
  const newComment = await createComment(commentData);

  return {
    id: newComment.id,
    userId: newComment.userId,
    postId: newComment.postId,
    content: newComment.content,
    createdAt: newComment.createdAt,
    updatedAt: newComment.updatedAt,
  };
};

export const fetchCommentById = async (
  id: number
): Promise<CommentResponseDTO> => {
  const comment = await findCommentById(id);
  if (!comment) throw new Error('Comment not found');

  return {
    id: comment.id,
    userId: comment.userId,
    postId: comment.postId,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
};

export const modifyComment = async (
  id: number,
  updateData: UpdateCommentDTO
): Promise<CommentResponseDTO> => {
  const updatedComment = await updateComment(id, updateData);

  return {
    id: updatedComment.id,
    userId: updatedComment.userId,
    postId: updatedComment.postId,
    content: updatedComment.content,
    createdAt: updatedComment.createdAt,
    updatedAt: updatedComment.updatedAt,
  };
};

export const removeComment = async (id: number): Promise<void> => {
  await deleteComment(id);
};

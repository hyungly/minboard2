// commentDTO.ts
export interface CreateCommentDTO {
  userId: number;
  postId: number;
  content: string;
}

export interface UpdateCommentDTO {
  content: string;
}

export interface CommentResponseDTO {
  id: number;
  userId: number;
  postId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

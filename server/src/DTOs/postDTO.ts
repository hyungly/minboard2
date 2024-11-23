//postDTO.ts
export interface CreatePostDTO {
  userId: number;
  title: string;
  content: string;
  likesCount?: number; // 선택적 필드
  status?: string; // 선택적 필드
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
}

export interface PostResponseDTO {
  id: number;
  userId: number;
  title: string;
  content: string;
  likesCount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
// src/DTOs/userDTO.ts
export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  role: string; // 역할 추가
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: number;
  username: string;
  email: string;
  role: string; // 역할 추가
}

// 사용자 업데이트를 위한 DTO
export interface UpdateUserDTO {
  username?: string;
  email?: string;
  password?: string;
  nickname?: string;
  profileImage?: string;
  role?: string; // 역할 필드 포함
}

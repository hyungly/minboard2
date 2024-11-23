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
  role: string;
  nickname?: string; // 선택적 필드
  profileImage?: string; // 선택적 필드
  createdAt: Date;
  updatedAt?: Date;
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

// 사용자 프로필을 위한 DTO
export interface UserProfileDTO {
  id: number;
  username: string;
  email: string;
  nickname?: string;
  profileImage?: string;
}

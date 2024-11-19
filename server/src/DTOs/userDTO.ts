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

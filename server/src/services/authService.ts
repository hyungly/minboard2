// authService.ts
import { CreateUserDTO, LoginUserDTO, UserResponseDTO } from '../DTOs/userDTO';
import { findUserByEmail, createUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';

// 사용자 등록
export const register = async (
  userData: CreateUserDTO
): Promise<UserResponseDTO> => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // 기본적으로 'user' 역할을 부여하거나, 사용자가 'admin'으로 지정할 수도 있습니다.
  const newUser = await createUser({
    ...userData,
    password: hashedPassword,
    role: 'user', // 'user' 기본값 설정
  });

  return {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role, // 반환되는 객체에 role 필드 포함
  };
};

// 사용자 로그인
export const login = async (credentials: LoginUserDTO): Promise<string> => {
  const user = await findUserByEmail(credentials.email);
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new Error('Invalid credentials.');
  }

  // 'role'이 없는 경우 기본값을 'user'로 설정
  const userRole = user.role || 'user';

  // JWT 페이로드 확장
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: userRole, // 예: 사용자의 역할을 추가 (관리자, 일반 사용자 등)
  };

  // 토큰 생성, 만료 시간 설정
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: process.env.JWT_EXPIRY || '1h',
  });
  return token;
};

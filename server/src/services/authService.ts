// authService.ts
import { CreateUserDTO, LoginUserDTO, UserResponseDTO } from '../DTOs/userDTO';
import { findUserByEmail, createUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';

// 사용자 등록
export const register = async (userData: CreateUserDTO): Promise<UserResponseDTO> => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists.');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await createUser({ ...userData, password: hashedPassword });
  return { id: newUser.id, username: newUser.username, email: newUser.email };
};

// 사용자 로그인
export const login = async (credentials: LoginUserDTO): Promise<string> => {
  const user = await findUserByEmail(credentials.email);
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new Error('Invalid credentials.');
  }

  // 토큰 생성, 만료 시간 설정
  const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: process.env.JWT_EXPIRY || '1h' });
  return token;
};

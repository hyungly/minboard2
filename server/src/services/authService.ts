// authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { findUserByEmail, createUser } from '../models/authModel';
import { CreateUserDTO, LoginUserDTO, UserResponseDTO } from '../DTOs/userDTO';

// 사용자 등록
export const registerUser = async (
  userData: CreateUserDTO
): Promise<UserResponseDTO> => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await createUser({
    ...userData,
    password: hashedPassword,
  });

  return {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role ?? 'user',
  };
};

// 사용자 로그인
export const loginUser = async (credentials: LoginUserDTO): Promise<string> => {
  const user = await findUserByEmail(credentials.email);
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new Error('Invalid credentials.');
  }

  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role ?? 'user',
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: process.env.JWT_EXPIRY || '1h',
  });
};

// Google OAuth 콜백 핸들러
export const handleGoogleCallback = (user: any): string => {
  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: process.env.JWT_EXPIRY || '1h',
  });
  return token;
};

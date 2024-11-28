import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { config } from '../config';
import {
  findUserByEmail,
  createUser,
  updateUserPassword,
} from '../models/authModel';
import { CreateUserDTO, LoginUserDTO, UserResponseDTO } from '../DTOs/userDTO';
import { User } from '@prisma/client';

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
    createdAt: newUser.createdAt,
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
export const handleGoogleCallback = (user: User): string => {
  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: process.env.JWT_EXPIRY || '1h',
  });
  return token;
};

// 인증번호 발송
export const sendVerificationCode = async (email: string) => {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: `"민보드 Minboard" <${process.env.NODEMAILER_USER}>`,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    verificationCodes.set(email, verificationCode); // 인증번호 메모리에 저장
    return verificationCode;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
};

// 인증번호 확인
export const verifyCode = (email: string, inputCode: string) => {
  const actualCode = verificationCodes.get(email); // 저장된 인증번호 가져오기
  return inputCode === actualCode;
};

// 메모리 상의 인증번호 저장소
const verificationCodes = new Map<string, string>();

// 비밀번호 재설정 요청
export const handleForgotPasswordRequest = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found.');
  }

  const resetToken = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: '1h',
  });

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: `"민보드 Minboard" <${process.env.NODEMAILER_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    text: `To reset your password, please use the following token: ${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
};

// 비밀번호 재설정
export const handlePasswordReset = async (
  token: string,
  newPassword: string
) => {
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret) as { userId: string };
  } catch (error) {
    console.error('Error verifying token:', error); // 에러를 로그로 출력
    throw new Error('Invalid or expired token.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(payload.userId, hashedPassword);
};

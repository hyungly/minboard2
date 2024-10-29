import { CreateUserDTO, LoginUserDTO, UserResponseDTO } from '../DTOs/userDTO';
import { findUserByEmail, createUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (userData: CreateUserDTO): Promise<UserResponseDTO> => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await createUser({ ...userData, password: hashedPassword });

  return {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
  };
};

export const login = async (credentials: LoginUserDTO): Promise<string> => {
  const user = await findUserByEmail(credentials.email);

  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new Error('Invalid email or password.');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};

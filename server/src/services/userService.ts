import { CreateUserDTO, UserResponseDTO } from '../DTOs/userDTO';
import { findUserByEmail, createUser } from '../models/userModel';
import bcrypt from 'bcrypt';

export const registerUser = async (userData: CreateUserDTO): Promise<UserResponseDTO> => {
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

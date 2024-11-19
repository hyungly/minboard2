import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * 비밀번호 해시화
 * @param password 평문 비밀번호
 * @returns 해시된 비밀번호
 */
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

/**
 * 평문 비밀번호와 해시된 비밀번호를 비교
 * @param password 평문 비밀번호
 * @param hashedPassword 해시된 비밀번호
 * @returns 비밀번호 일치 여부 확인
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

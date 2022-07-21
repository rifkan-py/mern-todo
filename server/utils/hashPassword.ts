import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';

async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error();
  }
}

async function isValidPassword(
  password: string,
  { password: hashedPassword }: UserModel
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Authentication fialed');
  }
}
export { hashPassword, isValidPassword };

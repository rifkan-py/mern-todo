import bcrypt from 'bcryptjs';
import { IUser } from '../models/User';

async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('oopos... something went wrong');
  }
}

async function isValidPassword(
  password: string,
  { password: userPassword }: IUser
) {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (error) {
    throw new Error('oopos... something went wrong');
  }
}
export { hashPassword, isValidPassword };

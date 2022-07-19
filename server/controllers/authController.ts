import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '../models/User';
import { isValidPassword, hashPassword } from '../utils/hashPassword';

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    throw new Error('User already exists with given email');
  }
  const hash = await hashPassword(password);
  const user: IUser = await User.create({
    name,
    email,
    password: hash,
  });

  res.json(user);
});

export interface TypedRequestBody<T> extends Request {
  body: T;
}

const signin = asyncHandler(
  async (req: TypedRequestBody<IUser>, res: Response) => {
    const user = await User.findOne({ email: req.body.email }).select('-__v');
    if (!user) {
      res.status(400);
      throw new Error('Authentication failed');
    }
    if (await isValidPassword(req.body.password, user)) {
      res.json(user);
    }
    res.status(400);
    throw new Error('Authentication failed');
  }
);

export { signup, signin };

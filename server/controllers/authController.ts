import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User, { UserModel } from '../models/User';
import { isValidPassword, hashPassword } from '../utils/hashPassword';
import { validationResult } from 'express-validator';
import { generateToken } from '../utils/jwtToken';
import { Types } from 'mongoose';

export interface IUser extends UserModel {
  _id: Types.ObjectId;
}

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existsUser = await User.findOne({ email });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  if (existsUser) {
    throw new Error('User already exists with given email');
  }
  const hash = await hashPassword(password);
  const user: IUser = await User.create({
    name,
    email,
    password: hash,
  });
  const token = generateToken(user._id);

  res.json({ user: user._id, token });
});

export interface TypedRequestBody<T> extends Request {
  body: T;
}

const signin = asyncHandler(
  async (req: TypedRequestBody<UserModel>, res: Response) => {
    const user = await User.findOne({ email: req.body.email }).select('-__v');
    if (!user) {
      res.status(400);
      throw new Error('Authentication failed');
    }
    if (await isValidPassword(req.body.password, user)) {
      const token = generateToken(user._id);

      res.json({ user: user._id, token });
    } else {
      res.status(400);
      throw new Error('Authentication failed');
    }
  }
);

export { signup, signin };

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import express, { NextFunction, Response } from 'express';

interface TypedRequest extends express.Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const protect = asyncHandler(
  async (req: TypedRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // Get user from the token
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req.user = await User.findById((<any>decoded).id).select('-password');

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

export { protect };

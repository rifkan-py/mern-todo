import { NextFunction, Request, Response } from 'express';

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500);
  res.json('error middleware');
  next();
}

export default errorHandler;

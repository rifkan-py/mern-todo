import { NextFunction, Request, Response } from 'express';

function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.status || 500);
  res.send({
    error: true,
    message: error.message || 'Internal server error',
  });
  next();
}
export default errorHandler;

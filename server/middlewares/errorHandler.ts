import { Request, Response, NextFunction } from 'express';

class CustomError {
  message!: string;
  status!: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalInfo!: any;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Oh no, this is embarrasing. We are having troubles my friend'
    );
  }

  // we are not using the next function to prvent from triggering
  // the default error-handler. However, make sure you are sending a
  // response to client to prevent memory leaks in case you decide to
  // NOT use, like in this example, the NextFunction .i.e., next(new Error())
  res.status((customError as CustomError).status).send(customError);
  next();
}

export default handleError;

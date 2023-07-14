import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  static handleError(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const { message } = err;
    return res.status(500).json({ message });
  }
}

export default ErrorHandler;

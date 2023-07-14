import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../Interfaces/users/IUser';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(emailRegex.test(email)) || password.length < 6) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    next();
  }
}

export default Validations;

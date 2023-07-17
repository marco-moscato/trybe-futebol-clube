import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/jwtAuth';
import UserModel from '../models/user.model';

const userModel = new UserModel();

class Auth {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const jwt = new Jwt();
    const message = { message: 'Token must be a valid token' };

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const [, token] = authorization.split(' ');

    if (!token) {
      return res.status(401).json(message);
    }

    try {
      const user = jwt.verify(token);
      const response = await userModel.findById(user.id);
      if (!response) return res.status(404).json(message);
      res.locals.user = response;
      next();
    } catch (exception) {
      return res.status(401).json(message);
    }
  }
}

export default Auth;

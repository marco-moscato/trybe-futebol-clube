import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

class AuthController {
  jwt = jwt.sign;
  async login(req: Request, res: Response) {
    const token = this.jwt({ id: 1 }, 'secret');
    return res.status(200).json({ token });
  }
}

export default AuthController;

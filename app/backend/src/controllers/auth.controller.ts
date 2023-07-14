import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

class AuthController {
  jwt = jwt.sign;
  userModel = new UserModel();

  async login(req: Request, res: Response) {
    const { email } = req.body;
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = this.jwt({ id: user.id }, 'secret');
    return res.status(200).json({ token });
  }
}

export default AuthController;

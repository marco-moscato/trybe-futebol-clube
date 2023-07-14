import { Request, Response } from 'express';
import UserService from '../services/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { ILogin } from '../Interfaces/users/IUser';

class AuthController {
  private userService = new UserService();

  async login(req: Request, res: Response) {
    const { status, data } = await this.userService.findByEmail(req.body as ILogin);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}

export default AuthController;

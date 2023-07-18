import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import UserModel from '../models/user.model';
import Jwt from '../utils/jwtAuth';
import { Token } from '../Interfaces/Token';

class UserService {
  constructor(
    private userModel = new UserModel(),
    private jwt = new Jwt(),
  ) {}

  async findByEmail(login: ILogin): Promise<ServiceResponse<Token>> {
    const { email, password } = login;

    const user = await this.userModel.findByEmail(email);

    const unauthorized: ServiceResponse<Token> = {
      status: 'UNAUTHORIZED',
      data: { message: 'Invalid email or password' },
    };

    if (!user) return unauthorized;

    if (!bcrypt.compareSync(password, user.password)) {
      return unauthorized;
    }

    const token = this.jwt.sign({ id: user.id });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  async findById(id: number): Promise<ServiceResponse<IUser['role']>> {
    const user = await this.userModel.findById(id);

    if (!user) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Token must be a valid token' },
      };
    }

    return { status: 'SUCCESSFUL', data: user.role };
  }
}

export default UserService;

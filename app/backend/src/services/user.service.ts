import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin } from '../Interfaces/users/IUser';
import UserModel from '../models/user.model';
import Jwt from '../utils/jwtAuth';

class UserService {
  private userModel = new UserModel();
  private jwt = new Jwt();

  async findByEmail(login: ILogin): Promise<ServiceResponse<{ token: string }>> {
    const { email, password } = login;
    const user = await this.userModel.findByEmail(email);
    const unauthorized: ServiceResponse<{ token: string }> = {
      status: 'UNAUTHORIZED',
      data: { message: 'Invalid email or password' },
    };

    if (!user) {
      return unauthorized;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return unauthorized;
    }

    const token = this.jwt.sign({ id: user.id });

    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }
}

export default UserService;

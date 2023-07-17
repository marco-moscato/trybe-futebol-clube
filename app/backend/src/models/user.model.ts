import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return !user ? null : user;
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    return !user ? null : user;
  }
}

export default UserModel;

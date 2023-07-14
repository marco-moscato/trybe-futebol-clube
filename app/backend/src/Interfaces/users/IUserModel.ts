import { IUser } from './IUser';

export interface IUserModel {
  findOne(email: string): Promise<IUser>;
}

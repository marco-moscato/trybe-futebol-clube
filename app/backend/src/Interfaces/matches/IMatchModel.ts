import { IMatch } from './IMatch';

export type IMatchModel = {
  findAll(): Promise<IMatch[]>;
  finish(id: IMatch['id']): Promise<number>;
};

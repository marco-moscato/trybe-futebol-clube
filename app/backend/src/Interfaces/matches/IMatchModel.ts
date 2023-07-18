import { IMatch } from './IMatch';

export type IMatchModel = {
  findAll(): Promise<IMatch[]>;
};

import { ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';
import { IMatch } from './IMatch';

export type IMatchModel = ICRUDModelUpdater<IMatch> & ICRUDModelReader<IMatch> & {
  finish(id: IMatch['id']): Promise<number>;
};

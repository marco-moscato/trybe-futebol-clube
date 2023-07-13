import { ITeam } from './ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findById(id: ITeam['id']): Promise<ITeam | null>;
}

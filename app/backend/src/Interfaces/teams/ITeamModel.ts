import { ITeam } from './ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
}

import { IMatch } from '../../../Interfaces/matches/IMatch';

export const fakeMatch: IMatch = {
  id: 1,
  homeTeamId: 2,
  homeTeamGoals: 2,
  awayTeamId: 3,
  awayTeamGoals: 3,
  inProgress: false,
}

export const fakeMatches = [fakeMatch];

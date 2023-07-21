import { ILeaderboard } from '../../../Interfaces/leaderboard/ILeaderboard';

export const match = {
  id: 1,
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: false,
}

export const matches = [match]

export const homeTeam = {
  id: 1,
  teamName: 'Fake Team',
}

export const awayTeam = {
  id: 2,
  teamName: 'Fake Team',
}

export const teams = [homeTeam];

export const awayTeams = [awayTeam];

export const leaderboard: ILeaderboard = {
  name: homeTeam.teamName,
  totalPoints: 1,
  totalGames: 1,
  totalVictories: 0,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 1,
  goalsOwn: 1,
  goalsBalance: 0,
  efficiency: (( 1 / (1 * 3)) * 100).toFixed(2),
}

export const leaderboardArray: ILeaderboard[] = [leaderboard];

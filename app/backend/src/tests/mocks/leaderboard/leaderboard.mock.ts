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

export const team = {
  id: 1,
  teamName: 'Fake Team Name',
}

export const teams = [team];

export const leaderboard: ILeaderboard = {
  name: team.teamName,
  totalPoints: 1,
  totalGames: 1,
  totalVictories: 0,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 1,
  goalsOwn: 1,
}

export const leaderboardArray: ILeaderboard[] = [leaderboard];

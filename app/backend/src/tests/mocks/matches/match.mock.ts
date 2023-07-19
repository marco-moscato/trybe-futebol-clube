import { IMatch } from '../../../Interfaces/matches/IMatch';

export const finishedMatch = {
  id: 1,
  homeTeamId: 2,
  homeTeamGoals: 2,
  awayTeamId: 3,
  awayTeamGoals: 3,
  inProgress: false,
  homeTeam: {
    teamName: 'Fake Name A'
  },
  awayTeam: {
    teamName: 'Fake Name B'
  }
};

export const matchInProgress = {
  id: 1,
  homeTeamId: 2,
  homeTeamGoals: 2,
  awayTeamId: 3,
  awayTeamGoals: 3,
  inProgress: true,
  homeTeam: {
    teamName: 'Fake Name A'
  },
  awayTeam: {
    teamName: 'Fake Name B'
  }
};

export const updatedMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
}

export const matchToUpdate = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
}

export const allMatches = [matchInProgress, finishedMatch];

export const matchesInProgress = [matchInProgress];

export const finishedMatches = [finishedMatch];

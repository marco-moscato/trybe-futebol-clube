import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';

class LeaderboardHomeService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  finishedMatches = async () => {
    const matches = await this.matchModel.findAll();
    const finished = matches.filter(({ inProgress }) => inProgress === false);
    return finished;
  };

  goals = async (id: number) => {
    const matches = await this.matchModel.findAll();
    const finished = matches.filter(({ inProgress }) => inProgress === false);

    let favor = 0;
    let own = 0;
    let games = 0;

    finished.forEach((match) => {
      if (match.homeTeamId === id) {
        favor += match.homeTeamGoals;
        own += match.awayTeamGoals;
        games += 1;
      }
    });
    return { favor, own, games };
  };

  victories = async (id: number) => {
    const matches = await this.finishedMatches();

    let victories = 0;
    let draws = 0;
    let points = 0;

    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals) {
        victories += 1;
        points += 3;
      }
      if (match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
        points += 1;
      }
    });
    return { victories, draws, points };
  };

  losses = async (id: number) => {
    const matches = await this.finishedMatches();
    let losses = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals) {
        losses += 1;
      }
    });
    return { losses };
  };

  objConstructor = async () => {
    const teams = await this.teamModel.findAll();

    return Promise.all(teams.map(async (team) => {
      const allGoals = await this.goals(team.id);
      const allVictories = await this.victories(team.id);
      const allLosses = await this.losses(team.id);

      return {
        name: team.teamName,
        totalPoints: allVictories.points,
        totalGames: allGoals.games,
        totalVictories: allVictories.victories,
        totalDraws: allVictories.draws,
        totalLosses: allLosses.losses,
        goalsFavor: allGoals.favor,
        goalsOwn: allGoals.own,
        goalsBalance: allGoals.favor - allGoals.own,
        efficiency: ((allVictories.points / (allGoals.games * 3)) * 100).toFixed(2),
      };
    }));
  };

  public async sortArray() {
    const leaderboard = await this.objConstructor();

    const result = leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
    ));

    return result;
  }

  public async serviceReturn(): Promise<ServiceResponse<ILeaderboard[]>> {
    const result = await this.sortArray();

    if (!result) return { status: 'NOT_FOUND', data: { message: 'Not Found' } };

    return { status: 'SUCCESSFUL', data: result };
  }
}

export default LeaderboardHomeService;

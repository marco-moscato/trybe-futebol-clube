import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';

class LeaderboardService {
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

    const result = teams.map(async (team) => {
      const allGoals = await this.goals(team.id);
      const allVictories = await this.victories(team.id);
      const allLosses = await this.losses(team.id);

      const obj = {
        name: team.teamName,
        totalPoints: allVictories.points,
        totalGames: allGoals.games,
        totalVictories: allVictories.victories,
        totalDraws: allVictories.draws,
        totalLosses: allLosses.losses,
        goalsFavor: allGoals.favor,
        goalsOwn: allGoals.own,
      };
      return obj;
    });
    return Promise.all(result);
  };

  public async serviceReturn(): Promise<ServiceResponse<ILeaderboard[]>> {
    const result = await this.objConstructor();

    if (!result) return { status: 'NOT_FOUND', data: { message: 'Not Found' } };

    return { status: 'SUCCESSFUL', data: result };
  }
}

export default LeaderboardService;

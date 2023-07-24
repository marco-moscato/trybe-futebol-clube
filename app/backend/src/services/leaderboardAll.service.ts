import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';

class LeaderboardAllService {
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
    const matches = await this.finishedMatches();

    let favor = 0;
    let own = 0;
    let games = 0;

    matches.forEach((match) => {
      if (match.awayTeamId === id) {
        favor += match.awayTeamGoals;
        own += match.homeTeamGoals;
        games += 1;
      }
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
    let pointsVictory = 0;

    matches.forEach((match) => {
      if (match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals) {
        victories += 1;
        pointsVictory += 3;
      }
      if (match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals) {
        victories += 1;
        pointsVictory += 3;
      }
    });
    return { victories, pointsVictory };
  };

  draws = async (id: number) => {
    const matches = await this.finishedMatches();

    let pointsDraw = 0;
    let draws = 0;

    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals) {
        pointsDraw += 1;
        draws += 1;
      }
      if (match.awayTeamId === id && match.awayTeamGoals === match.homeTeamGoals) {
        pointsDraw += 1;
        draws += 1;
      }
    });
    return { pointsDraw, draws };
  };

  losses = async (id: number) => {
    const matches = await this.finishedMatches();

    let losses = 0;

    matches.forEach((match) => {
      if (match.awayTeamId === id && match.awayTeamGoals < match.homeTeamGoals) {
        losses += 1;
      }
      if (match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals) {
        losses += 1;
      }
    });
    return { losses };
  };

  objConstructor = async () => {
    const teams = await this.teamModel.findAll();

    return Promise.all(teams.map(async (team) => {
      const { favor, own, games } = await this.goals(team.id);
      const { victories, pointsVictory } = await this.victories(team.id);
      const { losses } = await this.losses(team.id);
      const { pointsDraw, draws } = await this.draws(team.id);

      return { name: team.teamName,
        totalPoints: pointsVictory + pointsDraw,
        totalGames: games,
        totalVictories: victories,
        totalDraws: draws,
        totalLosses: losses,
        goalsFavor: favor,
        goalsOwn: own,
        goalsBalance: favor - own,
        efficiency: ((((pointsVictory + pointsDraw) / (games * 3)) * 100)).toFixed(2),
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

export default LeaderboardAllService;

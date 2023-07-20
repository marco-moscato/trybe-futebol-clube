import { Request, Response, Router } from 'express';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeam } from '../Interfaces/teams/ITeams';

const router = Router();
const matchModel = new MatchModel();
const teamModel = new TeamModel();

router.get(
  '/',
  async (req: Request, res: Response) => {
    const matches: IMatch[] = await matchModel.findAll();
    const teams: ITeam[] = await teamModel.findAll();

    const goals = (id: number) => {
      const finished = matches.filter(({ inProgress }) => inProgress === false);
      let favor = 0;
      let own = 0;
      let victories = 0;
      let draws = 0;
      let losses = 0;
      let games = 0;
      let points = 0;

      finished.forEach((match) => {
        if (match.homeTeamId === id) {
          favor += match.homeTeamGoals;
          own += match.awayTeamGoals;
          games += 1;
        }

        if (match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals) {
          victories += 1;
          points += 3;
        }
        if (match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals) {
          draws += 1;
          points += 1;
        }
        if (match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals) {
          losses += 1;
        }
      });
      return { favor, own, victories, draws, losses, games, points };
    };

    const objConstructor = () => {
      const result = teams.map((team) => ({
        name: team.teamName,
        totalPoints: goals(team.id).points,
        totalGames: goals(team.id).games,
        totalVictories: goals(team.id).victories,
        totalDraws: goals(team.id).draws,
        totalLosses: goals(team.id).losses,
        goalsFavor: goals(team.id).favor,
        goalsOwn: goals(team.id).own,
      }));
      return result;
    };

    return res.status(200).json(objConstructor());
  },
);

export default router;

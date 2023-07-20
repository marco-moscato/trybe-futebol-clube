import { Request, Response, Router } from 'express';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const router = Router();
const matchModel = new MatchModel();
const teamModel = new TeamModel();
const leaderboardService = new LeaderboardService(matchModel, teamModel);
const leaderboardController = new LeaderboardController(leaderboardService);

router.get(
  '/',
  async (req: Request, res: Response) => leaderboardController.findAll(req, res),
);

export default router;

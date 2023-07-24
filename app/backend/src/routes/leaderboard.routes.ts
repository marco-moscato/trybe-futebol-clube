import { Request, Response, Router } from 'express';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardHomeService from '../services/leaderboardHome.service';

const router = Router();
const matchModel = new MatchModel();
const teamModel = new TeamModel();
const leaderboardHomeService = new LeaderboardHomeService(matchModel, teamModel);
const leaderboardController = new LeaderboardController(leaderboardHomeService);

router.get(
  '/home',
  async (req: Request, res: Response) => leaderboardController.findAllHome(req, res),
);

router.get(
  '/away',
  async (req: Request, res: Response) => leaderboardController.findAllAway(req, res),
);

router.get(
  '/',
  async (req: Request, res: Response) => leaderboardController.findAll(req, res),
);

export default router;

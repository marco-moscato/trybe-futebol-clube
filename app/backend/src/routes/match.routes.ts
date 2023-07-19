import { Request, Response, Router } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import MatchModel from '../models/match.model';
import Auth from '../middlewares/auth.middleware';
import SequelizeMatch from '../database/models/SequelizeMatch';

const router = Router();
const matchModel = new MatchModel();
const matchService = new MatchService(matchModel);
const matchController = new MatchController(matchService);

router.get(
  '/',
  (_req: Request, res: Response) => matchController.findAll(_req, res),
);

router.patch(
  '/:id/finish',
  Auth.verifyToken,
  (req: Request, res: Response) => matchController.finish(req, res),
);

router.patch(
  '/:id',
  Auth.verifyToken,
  (req: Request, res: Response) => matchController.update(req, res),
);

router.post(
  '/',
  Auth.verifyToken,
  async (req: Request, res: Response) => {
    const { body } = req;

    const newMatch = await SequelizeMatch.create({
      homeTeamId: body.homeTeamId,
      homeTeamGoals: body.homeTeamGoals,
      awayTeamId: body.awayTeamId,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    });

    return res.status(201).json(newMatch);
  },
);

export default router;

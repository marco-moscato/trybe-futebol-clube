import { Request, Response, Router } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import MatchModel from '../models/match.model';
import Auth from '../middlewares/auth.middleware';
import matchValidation from '../middlewares/matchValidation.middleware';

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
  matchValidation.validateCreation,
  async (req: Request, res: Response) => matchController.create(req, res),
);

export default router;

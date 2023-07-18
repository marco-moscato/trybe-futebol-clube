import { Request, Response, Router } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import MatchModel from '../models/match.model';
import Auth from '../middlewares/auth.middleware';

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
  (req, res) => matchController.finish(req, res),
);

export default router;

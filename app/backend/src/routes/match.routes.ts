import { Request, Response, Router } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import MatchModel from '../models/match.model';
import Auth from '../middlewares/auth.middleware';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatch } from '../Interfaces/matches/IMatch';

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
router.patch(
  '/:id/',
  Auth.verifyToken,
  async (req, res) => {
    const id = Number(req.params.id);
    const infoToUpdate: Partial<IMatch> = req.body;
    const [affectedRows] = await SequelizeMatch.update(
      infoToUpdate,
      { where: { id } },
    );
    if (affectedRows === 0) {
      return res.status(400).json({ message: 'No match has been updated' });
    }
    return res.status(200).json({ message: 'Match sucessfully updated' });
  },
);

export default router;

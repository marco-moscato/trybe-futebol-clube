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
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const [affectedRows] = await SequelizeMatch.update(
      { inProgress: false },
      { where: { id } },
    );

    if (affectedRows === 0) {
      return res.status(400).json({
        message: 'No match has been finished',
      });
    }

    if (affectedRows > 0) {
      return res.status(200).json({ message: 'Finished' });
    }
  },
);

export default router;

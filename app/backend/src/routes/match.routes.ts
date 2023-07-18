import { Request, Response, Router } from 'express';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

const router = Router();

router.get(
  '/',
  async (_req: Request, res: Response) => {
    const matches = await SequelizeMatch.findAll({
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
    return res.status(200).json(matches);
  },
);

export default router;
import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  async findAll(req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.serviceReturn();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(200).json(data);
  }
}

export default LeaderboardController;

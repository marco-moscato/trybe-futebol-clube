import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/leaderboardHome.service';
import LeaderboardAwayService from '../services/leaderboardAway.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class LeaderboardController {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeService(),
    private leaderboardAwayService = new LeaderboardAwayService(),
  ) {}

  async findAllHome(req: Request, res: Response) {
    const { status, data } = await this.leaderboardHomeService.serviceReturn();

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(200).json(data);
  }

  async findAllAway(req: Request, res: Response) {
    const { status, data } = await this.leaderboardAwayService.serviceReturn();

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(200).json(data);
  }
}

export default LeaderboardController;

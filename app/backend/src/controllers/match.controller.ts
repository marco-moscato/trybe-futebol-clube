import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const { data } = await this.matchService.findAll();

    const matchStatus = req.query.inProgress;

    if (Array.isArray(data) && matchStatus) {
      const filteredMatches = data.filter((match) => match.inProgress.toString() === matchStatus);
      return res.status(200).json(filteredMatches);
    }
    return res.status(200).json(data);
  }
}

export default MatchController;

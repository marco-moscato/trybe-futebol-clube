import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.findAll();
    res.status(200).json(serviceResponse.data);
  }
}

export default MatchController;

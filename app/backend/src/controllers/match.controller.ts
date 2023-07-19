import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

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

  public async finish(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { status, data } = await this.matchService.finish(id);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(200).json(data);
  }

  public async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { body } = req;

    const { status, data } = await this.matchService.update(id, body);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(200).json(data);
  }
}

export default MatchController;

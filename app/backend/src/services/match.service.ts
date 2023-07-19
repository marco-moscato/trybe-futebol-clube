import { NewEntity } from '../Interfaces';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/match.model';

class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finish(id: IMatch['id']): Promise<ServiceResponse<ServiceMessage>> {
    const modelResponse = await this.matchModel.finish(id);

    if (modelResponse === 0) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'No match has been finished' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  public async update(id: IMatch['id'], data: Partial<IMatch>): Promise<ServiceResponse<IMatch>> {
    const modelResponse = await this.matchModel.update(id, data);

    if (!modelResponse) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'No match has been updated' },
      };
    }

    return { status: 'SUCCESSFUL', data: modelResponse };
  }

  public async create(data: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const modelResponse = await this.matchModel.create(data);
    return { status: 'SUCCESSFUL', data: modelResponse };
  }
}

export default MatchService;

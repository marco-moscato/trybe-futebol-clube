import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async finish(id: IMatch['id']): Promise<number> {
    const [affectedRows] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return affectedRows;
  }
}

export default MatchModel;

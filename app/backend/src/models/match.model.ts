import { NewEntity } from '../Interfaces';
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

  async findById(id: number): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return dbData;
  }

  async finish(id: IMatch['id']): Promise<number> {
    const [affectedRows] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return affectedRows;
  }

  async update(id: IMatch['id'], data: Partial<IMatch>): Promise<IMatch | null> {
    const [affectedRows] = await this.model.update(
      data,
      { where: { id } },
    );
    if (affectedRows === 0) return null;
    return this.findById(id);
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const newMatch = await this.model.create({
      homeTeamId: data.homeTeamId,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamId: data.awayTeamId,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  }
}

export default MatchModel;

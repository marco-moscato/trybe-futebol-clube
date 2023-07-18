import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';

import { app } from '../app';
import { fakeMatches } from './mocks/matches/match.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Dado a rota /matches', () => {

  afterEach(sinon.restore);

  describe('Dado o método GET', () => {
    it('Retorna todos as partidas cadastradados com status 200', async function() {
      const matches = SequelizeMatch.bulkBuild(fakeMatches, {
        include: [
          { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });

      sinon.stub(SequelizeMatch, 'findAll').resolves(matches);

      const { status, body } = await chai.request(app).get('/matches');
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(fakeMatches);
    });
  });
});

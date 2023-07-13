import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/teams/teams.mock';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Dado a rota /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  describe('Dado a rota GET', () => {
    it('Retorna o status 200 e um json contendo os times cadastrados', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

      const { status, body } = await chai.request(app).get('/teams');
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(teams);
    });

  });
});

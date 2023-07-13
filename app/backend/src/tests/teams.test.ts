import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/teams/teams.mock';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Dado a rota /teams', () => {

  afterEach(sinon.restore);

  describe('Dado o método GET', () => {
    it('Retorna todos os times cadastradados com status 200', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

      const { status, body } = await chai.request(app).get('/teams');
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(teams);
    });
  
    describe('Dado um ID que exista no banco', () => {
      it('Retorna o time cadastrado com o status 200', async function() {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);

        const { status, body } = await chai.request(app).get('/teams/1');
        
        expect(status).to.be.equal(200);
        expect(body).to.deep.equal(team);
      });
    });

    describe('Dado um ID inexistente', () => {
      it('Retorna uma mensagem de erro com status 404', async function() {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

        const { status, body } = await chai.request(app).get('/teams/999');
        
        expect(status).to.be.equal(404);
        expect(body.message).to.be.equal('Team 999 not found');
      });
    });
  });
});

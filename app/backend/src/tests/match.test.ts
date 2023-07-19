import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';

import { app } from '../app';
import { allMatches, newFinishedMatch, newMatch, newMatchCreated, newMatchSameId } from './mocks/matches/match.mock';
import Jwt from '../utils/jwtAuth';
import { userMock } from './mocks/users/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matches', () => {

    afterEach(() => {
      sinon.restore();
    })

  describe('Dado o método GET', () => {
    it('Retorna todos as partidas cadastradados com status 200', async function() {         
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

      const { status, body } = await chai.request(app).get('/matches');
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(allMatches);
    });

    it('Retorna as partidas em andamento com status 200', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

      const filteredMatches = allMatches.filter((match) => match.inProgress === true)
      
      const { status, body } = await chai.request(app)
      .get('/matches')
      .query('inProgress=true');
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(filteredMatches);
    });

    it('Retorna as partidas finalizadas com status 200', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
      
      const filteredMatches = allMatches.filter((match) => match.inProgress === false)
      
      const { status, body } = await chai.request(app)
      .get('/matches')
      .query('inProgress=false');
      
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(filteredMatches);
    });
  });

  describe('Dado o método POST', () => {
    describe('Dado que um token não foi informado', () => {
      it('Retorna uma mensagem de erro com status 401', async function() {         
        const { status, body } = await chai.request(app)
        .post('/matches');
      
        expect(status).to.be.equal(401);
        expect(body.message).to.deep.equal('Token not found');
      });
    });

    describe('Dado um token inválido', () => {
      it('Retorna um erro com status 401', async function() {         
        const invalidToken = 'invalidToken';

        const { status, body } = await chai.request(app)
        .post('/matches')
        .set({ Authorization: `Bearer ${invalidToken}` });
      
        expect(status).to.be.equal(401);
        expect(body.message).to.deep.equal('Token must be a valid token');
      });
    });

    describe('Dado um token válido e uma requisição com uma partida válida', () => {
      it('Retorna a partida inserida com status 201', async function() {         
        const validToken = 'validToken';
        const match = SequelizeMatch.build(newMatchCreated);

        sinon.stub(SequelizeMatch, 'create').resolves(match);
        sinon.stub(Jwt.prototype, 'verify').returns(userMock);

        const { status, body } = await chai.request(app)
        .post('/matches')
        .set({ Authorization: `Bearer ${validToken}` })
        .send(newMatch)
      
        expect(status).to.be.equal(201);
        expect(body).to.deep.equal(newMatchCreated);
      });
    });

    describe('Dado um token válido', () => {
      describe('Dado que foi informado uma partida entre dois times com mesmo ID', () => {
        it('Retorna uma mensagem de erro com status 422', async function() {         
          const validToken = 'validToken';
          sinon.stub(Jwt.prototype, 'verify').returns(userMock);

          const { status, body } = await chai.request(app)
          .post('/matches')
          .set({ Authorization: `Bearer ${validToken}` })
          .send(newMatchSameId);
          
          expect(status).to.be.equal(422);
          expect(body.message).to.deep.equal('It is not possible to create a match with two equal teams');
        });
      });
    });

    describe('Dado um token válido e uma partida não foi informada no corpo da requisição', () => {
      it('Retorna um erro com status 400', async function() {         
        const validToken = 'validToken';

        sinon.stub(Jwt.prototype, 'verify').returns(userMock);

        const { status, body } = await chai.request(app)
        .post('/matches')
        .set({ Authorization: `Bearer ${validToken}` })
        .send(undefined);
      
        expect(status).to.be.equal(400);
        expect(body.message).to.deep.equal('A match must be informed');
      });
    });

    describe('Dado um token válido', function() {
      describe('Dado que foi informado no corpo da requisição uma partida com status finalizado', () => {
        it('Retorna um erro com status 400', async function() {         
          const validToken = 'validToken';

          sinon.stub(Jwt.prototype, 'verify').returns(userMock);

          const { status, body } = await chai.request(app)
          .post('/matches')
          .set({ Authorization: `Bearer ${validToken}` })
          .send(newFinishedMatch);
        
          expect(status).to.be.equal(400);
          expect(body.message).to.deep.equal('Match status must be in progress');
        });
      });
    });
  });
});

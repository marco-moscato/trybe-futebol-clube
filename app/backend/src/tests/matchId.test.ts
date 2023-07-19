import { app } from '../app';
import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import {  matchToUpdate, updatedMatch } from './mocks/matches/match.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import Jwt from '../utils/jwtAuth';
import { userMock } from './mocks/users/users.mock';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testa o endpoint /matches/:id', function() {

  afterEach(() => {
    sinon.restore();
  })

  describe('Dado o método PATCH', function() {
    describe('Dado que um token não foi informado', function() {
      it('Retorna uma mensagem de erro com status 401', async function() {
        const { status, body } = await chai.request(app).patch('/matches/1');
        
        expect(status).to.be.equal(401);
        expect(body.message).to.deep.equal('Token not found');
      })
    })

    describe('Dado que o token é inválido', function() {
      it('Retorna uma mensagem de erro com status 401', async function() {
        const invalidToken = 'invalidToken';
  
        const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .set({ Authorization: `Bearer ${invalidToken}` });
          
        expect(status).to.be.equal(401);
        expect(body.message).to.deep.equal('Token must be a valid token');
      })
    })

    describe('Dado que o token é válido', function() {
      it('Retorna a partida atualizada com status 200', async function() {
        const validToken = 'validToken';
        const match = SequelizeMatch.build(updatedMatch);

        sinon.stub(Jwt.prototype, 'verify').returns(userMock);
        sinon.stub(SequelizeMatch, 'findByPk').resolves(match);
        sinon.stub(SequelizeMatch, 'update').resolves([1]);
  
        const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .set({ Authorization: `Bearer ${validToken}` })
        .send(matchToUpdate);
          
        expect(status).to.be.equal(200);
        expect(body).to.deep.equal(updatedMatch);
      })
    })
  })
})
import { app } from '../app';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { matchToUpdate } from './mocks/matches/match.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import Jwt from '../utils/jwtAuth';
import { userMock } from './mocks/users/users.mock';

const { expect } = chai;

describe('Testa o endpoint /matches/:id', function() {
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
        it('Retorna a partida atualizado com status 200', async function() {
            const validToken = 'invalidToken';
            sinon.stub(SequelizeMatch, 'update').resolves([1]);
            sinon.stub(Jwt.prototype, 'verify').returns(userMock);
  
            const { status, body } = await chai.request(app)
            .patch('/matches/1')
            .set({ Authorization: `Bearer ${validToken}` })
            .send(matchToUpdate);
          
            expect(status).to.be.equal(200);
            expect(body.message).to.deep.equal('Match sucessfully updated');
        })
      })
    })
  })
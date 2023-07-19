import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

import Jwt from '../utils/jwtAuth';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { userMock } from './mocks/users/users.mock';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testa a rota /matches/:id/finish', () => {
 
    afterEach(sinon.restore);
  
    describe('Dado o método PATCH, tenta finalizar uma partida', () => {
      describe('Dado que um token não foi informado', () => {
        it('Retorna uma mensagem de erro com status 401', async function() {         
          const { status, body } = await chai.request(app).patch('/matches/1/finish');
        
          expect(status).to.be.equal(401);
          expect(body.message).to.deep.equal('Token not found');
        });
  
      describe('Dado um token inválido', () => {
        it('Retorna um erro com status 401', async function() {         
          const invalidToken = 'invalidToken';
  
          const { status, body } = await chai.request(app)
          .patch('/matches/1/finish')
          .set({ Authorization: `Bearer ${invalidToken}` });
        
          expect(status).to.be.equal(401);
          expect(body.message).to.deep.equal('Token must be a valid token');
        });
      });
    });
  
      describe('Dado um token válido', () => {
        describe('Dado o id de uma partida que não existe', () => {
          it('Retorna uma mensagem de erro com o status 400', async function() {         
            const validToken = 'validToken';
            sinon.stub(SequelizeMatch, 'update').resolves([0]);
            sinon.stub(Jwt.prototype, 'verify').returns(userMock);
  
            const { status, body } = await chai.request(app)
            .patch('/matches/999/finish')
            .set({ Authorization: `Bearer ${validToken}` });
          
            expect(status).to.be.equal(400);
            expect(body.message).to.deep.equal('No match has been finished');
          });
        });
      });
  
      describe('Dado um token válido', () => {
        describe('Dado um id de uma partida já finalizada no banco', () => {
          it('Retorna uma mensagem de erro com o status 400', async function() {         
            const validToken = 'validToken';
            sinon.stub(SequelizeMatch, 'update').resolves([0]);
            sinon.stub(Jwt.prototype, 'verify').returns(userMock);
  
            const { status, body } = await chai.request(app)
            .patch('/matches/1/finish')
            .set({ Authorization: `Bearer ${validToken}` });
          
            expect(status).to.be.equal(400);
            expect(body.message).to.deep.equal('No match has been finished');
          });
        });
      });
  
      describe('Dado um token válido', () => {
        describe('Dado um id de uma partida que exista no banco e está e andamento', () => {
          it('Retorna uma mensagem de sucesso com o status 200', async function() {         
            const validToken = 'validToken';
            sinon.stub(SequelizeMatch, 'update').resolves([1]);
            sinon.stub(Jwt.prototype, 'verify').returns(userMock);
  
            const { status, body } = await chai.request(app)
            .patch('/matches/1/finish')
            .set({ Authorization: `Bearer ${validToken}` });
          
            expect(status).to.be.equal(200);
            expect(body.message).to.deep.equal('Finished');
          });
        });
      });
    });
});

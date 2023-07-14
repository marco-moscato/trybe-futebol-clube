import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser';
import { userMock, tokenMock } from './mocks/users/users.mock';
import { ILogin, IUser } from '../Interfaces/users/IUser';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Dado a rota /login', function () {

  afterEach(function () {
    sinon.restore();
  })

  describe('Dado o método POST', function () {
    describe('Dado que as informação de login do usuário estão corretas', function () {
      it('Retorna um token com status 200', async function() {
        const loginData: ILogin = {
          email: 'valid@email.com',
          password: 'valid-password',
        }

        sinon.stub(SequelizeUser, 'findOne').resolves(userMock as SequelizeUser)

        const { status, body } = await chai.request(app)
          .post('/login')
          .send(loginData);
        
        expect(status).to.be.equal(200);
        expect(body).to.haveOwnProperty('token');
      });
    });

    describe('Dado que o email informado não está cadastrado', function () {
      it('Retorna um erro com status 404', async function() {
        const loginData: ILogin = {
          email: 'not_found@email.com',
          password: 'valid-password',
        }

        sinon.stub(SequelizeUser, 'findOne').resolves(null)

        const { status, body } = await chai.request(app)
          .post('/login')
          .send(loginData);
        
        expect(status).to.be.equal(404);
        expect(body.message).to.be.equal('User not found');
      });
    });

    describe('Dado que um email não foi informado', function () {
      it('Retorna uma mensagem de erro com status 400', async function() {
        const loginData: ILogin = {
          email: '',
          password: 'valid-password',
        }

        const { status, body } = await chai.request(app)
          .post('/login')
          .send(loginData);
        
        expect(status).to.be.equal(400);
        expect(body.message).to.deep.equal('All fields must be filled');
    });
  });

    describe('Dado que uma senha não foi informada', function () {
      it('Retorna uma mensagem de erro com status 400', async function() {
        const loginData: ILogin = {
          email: 'valid@email.com',
          password: '',
        }

        const { status, body } = await chai.request(app)
          .post('/login')
          .send(loginData);
        
        expect(status).to.be.equal(400);
        expect(body.message).to.deep.equal('All fields must be filled');
      });
    });

    describe('Dado que uma senha não foi informada', function () {
      it('Retorna uma mensagem de erro com status 400', async function() {
        const loginData: ILogin = {
          email: 'valid@email.com',
          password: '',
        }

        const { status, body } = await chai.request(app)
          .post('/login')
          .send(loginData);
        
        expect(status).to.be.equal(400);
        expect(body.message).to.deep.equal('All fields must be filled');
      });
    });
  })
});

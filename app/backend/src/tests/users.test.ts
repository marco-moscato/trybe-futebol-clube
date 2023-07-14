import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUser from '../database/models/SequelizeUser';
import { userMock, tokenMock } from './mocks/users/users.mock';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import * as bcrypt from 'bcryptjs';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', function () {

  afterEach(function () {
    sinon.restore();
  })

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

  describe('Dado que o email tem um formato inválido', function () {
    it('Retorna uma mensagem de erro com status 401', async function() {
      const loginData: ILogin = {
        email: 'invalid-email',
        password: 'valid-password',
      }

      const { status, body } = await chai.request(app)
        .post('/login')
        .send(loginData);
      
      expect(status).to.be.equal(401);
      expect(body.message).to.deep.equal('Invalid email or password');
    });
  });

  describe('Dado que a senha tem um tamanho inválido', function () {
    it('Retorna uma mensagem de erro com status 401', async function() {
      const loginData: ILogin = {
        email: 'valid@email.com',
        password: '1234',
      }

      const { status, body } = await chai.request(app)
        .post('/login')
        .send(loginData);
      
      expect(status).to.be.equal(401);
      expect(body.message).to.deep.equal('Invalid email or password');
    });
  });

  describe('Dado que o usuário está cadastrado e a senha é válida', function () {
    it('Retorna um token com status 200', async function() {
      sinon.stub(bcrypt, 'compareSync').returns(true);
      
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
    it('Retorna um erro com status 401', async function() {    
      const loginData: ILogin = {
        email: 'not_found@email.com',
        password: 'valid-password',
      }

      sinon.stub(SequelizeUser, 'findOne').resolves(null)

      const { status, body } = await chai.request(app)
        .post('/login')
        .send(loginData);
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Invalid email or password');
    });
  });

  describe('Dado que o usuário está cadastrado e a senha é inválida', function () {
    it('Retorna um erro com status 401', async function() {
      sinon.stub(bcrypt, 'compareSync').returns(false);

      const loginData: ILogin = {
        email: 'valid@email.com',
        password: 'wrong-password',
      }

      sinon.stub(SequelizeUser, 'findOne').resolves(userMock as SequelizeUser)

      const { status, body } = await chai.request(app)
        .post('/login')
        .send(loginData);
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Invalid email or password');
    });
  });  
});

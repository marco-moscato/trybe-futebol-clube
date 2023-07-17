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
import { Token } from '../Interfaces/Token';
import { Request } from 'express';
import Jwt from '../utils/jwtAuth';
import { JwtPayload } from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login/role', function () {

  afterEach(function () {
    sinon.restore();
  })

  describe('Caso token não seja informado', function () {
    it('Retorna um erro com status 401', async function() {
      const { status, body } = await chai.request(app)
        .get('/login/role');
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token not found');
    });
  });

  describe('Caso o token seja informado mas seja inválido', function () {
    it('Retorna um erro com status 401', async function() {
      const invalidToken = 'invalidToken';
      const jwt = new Jwt();

      sinon.stub(jwt, 'verify').throws({ error: 'erro' } as JwtPayload);

      const { status, body } = await chai.request(app)
        .get('/login/role')
        .set({ Authorization: `Bearer ${invalidToken}` });
      
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Token must be a valid token');
    });
  });

  describe('Caso o token seja válido', function () {
    it('Retorna o tipo de usuário com status 200', async function() {
      const validToken = 'validToken';

      sinon.stub(Jwt.prototype, 'verify').returns({ id: 1 });

      const fakeUser = SequelizeUser.build(userMock);

      sinon.stub(SequelizeUser, 'findByPk').resolves(fakeUser);

      const { status, body } = await chai.request(app)
        .get('/login/role')
        .set({ Authorization: `Bearer ${validToken}` })
      
      expect(status).to.be.equal(200);
      expect(body.role).to.be.equal(fakeUser.role);
    });
  });
});

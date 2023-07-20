import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import { leaderboardArray, matches, teams } from './mocks/leaderboard/leaderboard.mock';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

const { expect } = chai;

describe('Testa o endpoint GET /leaderboard/home', function() {
  it('Retorna um objeto com o leaderboard e com status 200 ', async function() {
    const match = SequelizeMatch.bulkBuild(matches);
    const team = SequelizeTeam.bulkBuild(teams);

    sinon.stub(SequelizeMatch, 'findAll').resolves(match);
    sinon.stub(SequelizeTeam, 'findAll').resolves(team);
    
    const { status, body } = await chai.request(app)
    .get('/leaderboard/home');

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(leaderboardArray);
  })
})

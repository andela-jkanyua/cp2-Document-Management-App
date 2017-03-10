// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const Users = require('./helpers/users');
const token = require('./helpers/token');
const expect = require('chai').expect;

const should = chai.should();

chai.use(chaiHttp);
// Our parent block

/*
 * Test the users /GET route
 */
describe('Roles', () => {
  const tokens = {};
  before((done) => {
    tokens.user = token.generate(Users[0]);
    done();
  });
  describe('/GET roles', () => {
    it('it only allows Admin user', (done) => {
      tokens.notAdminUser = token.generate(Users[1]);
      chai.request(server)
      .get('/roles')
      .set('x-access-token', tokens.notAdminUser)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    });
    it('it should GET all the roles', (done) => {
      chai.request(server)
      .get('/roles')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
  });
  describe('/POST roles', () => {
    it('creates a new role', (done) => {
      chai.request(server)
      .post('/roles')
      .set('x-access-token', tokens.user)
      .send({
        title: 'New Role',
        description: 'New role description',
        isAdmin: false,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
    });
    it('does not POST invalid role', (done) => {
      chai.request(server)
      .post('/roles')
      .set('x-access-token', tokens.user)
      .send({ description: 'Role without title' })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.name).to.contain('SequelizeValidationError');
        expect(res.body.message).to.contain('notNull Violation: title cannot be null');
        done();
      });
    });
  });
});

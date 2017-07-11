// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const Users = require('./helpers/users');
const token = require('./helpers/token');
const expect = require('chai').expect;

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
      .get('/api/roles')
      .set('x-access-token', tokens.notAdminUser)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    });

    it('it should GET all the roles', (done) => {
      chai.request(server)
      .get('/api/roles')
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
      .post('/api/roles')
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
      .post('/api/roles')
      .set('x-access-token', tokens.user)
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql(`Provide role 'title' and 'isAdmin' fields`);
        done();
      });
    });
  });
  describe('/PUT roles', () => {
    it('updates an existing role', (done) => {
      chai.request(server)
      .put('/api/roles/1')
      .set('x-access-token', tokens.user)
      .send({
        title: 'Updated Admin',
        description: 'Updated Admin role description',
        isAdmin: true,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('Returns error message if role does not exist', (done) => {
      chai.request(server)
      .put('/api/roles/100')
      .set('x-access-token', tokens.user)
      .send({
        title: 'Updated Admin',
        description: 'Updated Admin role description',
        isAdmin: true,
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql('Role Not Found');
        done();
      });
    });
  });
  describe('/DELETE roles', () => {
    it('deletes an existing role', (done) => {
      chai.request(server)
      .delete('/api/roles/3')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });

    it('returns error if role does not exist', (done) => {
      chai.request(server)
      .delete('/api/roles/300')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql('Role Not Found');
        done();
      });
    });
  });
});

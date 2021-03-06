const chai = require('chai');
const expect = require('chai').expect;
const server = require('../../server/server');
const chaiHttp = require('chai-http');
const Users = require('./helpers/users');
const token = require('./helpers/token');

chai.use(chaiHttp);

describe('Auth API endpoint', () => {
  // Create a user to use in auth test
  before((done) => {
    chai.request(server)
      .post('/api/users')
      .send(Users[2])
      .end(() => {
        done();
      });
  });

  describe('POST /login', () => {
    it('logs in a user', (done) => {
      chai.request(server)
      .post('/api/login')
      .send(Users[2])
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.success.should.be.eql(true);
        done();
      });
    });

    it('require email and password to be provided', (done) => {
      chai.request(server)
      .post('/api/login')
      .send({ email: Users[2].email })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.success.should.be.eql(false);
        done();
      });
    });

    it('ensures email matches an existing user', (done) => {
      chai.request(server)
      .post('/api/login')
      .send({ email: 'wrong@email.com', password: 'does-not-matter' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.success.should.be.eql(false);
        done();
      });
    });

    it('does not validate wrong password', (done) => {
      chai.request(server)
      .post('/api/login')
      .send({ email: Users[2].email, password: 'wrong-password' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.equal('Authentication Failed. Wrong Password');
        done();
      });
    });

    it('returns a token', (done) => {
      chai.request(server)
      .post('/api/login')
      .send(Users[2])
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.success.should.be.eql(true);
        res.body.message.should.be.equal('Authenticated');
        done();
      });
    });

    it('returns error if token not provided', (done) => {
      chai.request(server)
      .post('/api/documents')
      .send(Users[2])
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('returns error if token is invalid', (done) => {
      chai.request(server)
      .post('/api/documents')
      .send(Users[2])
      .set('x-access-token', 'AN1NVALIDTOK3N')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.equal('Failed to authenticate token.');
        done();
      });
    });
  });
  describe('POST /logout', () => {
    const tokens = {};
    before((done) => {
      tokens.user = token.generate(Users[0]);
      done();
    });

    it('logs out a user', (done) => {
      chai.request(server)
      .post('/api/logout')
      .send({})
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});

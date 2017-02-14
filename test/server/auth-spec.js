const chai = require('chai');
const expect = require('chai').expect;
const server = require('../../server/server');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Login API endpoint', () => {
  describe('POST /login', () => {
    it('returns a token', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({
          email: 'example@email.com',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('requires email to be provided', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({ password: 'password' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Email is required');
          done();
        });
    });

    it('requires password to be provided', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({ email: 'example@email.com' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Password is required');
          done();
        });
    });

    it('requires email that belongs to existing user', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({ email: 'example@example.com', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal("Email doesn't match any user");
          done();
        });
    });

    it('only returns token if the password matches the email', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({
          email: 'email@example.com',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal("Email and password don't match");
          done();
        });
    });
  });

  describe('DELETE /login', () => {
    it('is not allowed', (done) => {
      chai.request(server)
        .delete('/users/login')
        .end((err, res) => {
          expect(res.status).to.equal(405);
          expect(res.body.error)
            .to.contain('Method Not Allowed');
          done();
        });
    });
  });
});
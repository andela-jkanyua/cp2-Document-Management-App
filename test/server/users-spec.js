//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const should = chai.should();
const expect = require('chai').expect;
const usersController = require('../../server/controllers').users;
const Users = require('./helpers/users');
const token = require('./helpers/token');

//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
//Our parent block
describe('Users', () =>{
  const tokens = {};
  before((done) => {
    tokens.user = token.generate(Users[0]);
    tokens.notAdmin = token.generate(Users[1]);
    done();
  });
/*
 * Test the users /GET route
 */
describe('/GET users', () => {
  it('it should GET all the users', (done) => {
    chai.request(server)
    .get('/users')
    .set('x-access-token', tokens.user)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.not.be.eql(0);
      done();
    });
  });
  it('should GET a specific user', (done) => {
    chai.request(server)
    .get(`/users/1`)
    .set('x-access-token', tokens.user)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('firstName');
      done();
    });
  });
  it('allows only user/owner or admin to access user details', (done) => {
    chai.request(server)
    .get(`/users/1`)
    .set('x-access-token', tokens.notAdmin)
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.be.a('object');
      res.body.success.should.be.eql(false);
      done();
    });
  });
  it('allows only user/owner or admin access to documents', (done) => {
    chai.request(server)
    .get(`/users/1/documents`)
    .set('x-access-token', tokens.notAdmin)
    .end((err, res) => {
      res.should.have.status(403);
      res.body.should.be.a('object');
      res.body.success.should.be.eql(false);
      done();
    });
  });
});
/*
 * Test the /POST route
 */
describe('/POST users', () => {
  it('should POST a user with all fields', (done) => {
    chai.request(server)
    .post('/users')
    .send(Users[1])
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.success.should.be.eql(true);
      done();
    });
  });
  it('should update a user', (done) => {
    chai.request(server)
    .put(`/users/2`)
    .set('x-access-token', tokens.user)
    .send({email: 'updated@email.com'})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.email.should.be.eql('updated@email.com');
      done();
    });
  });
  it('should NOT POST a user without all fields', (done) => {
    const invalidUser = {
      password: "password",
      firstName: 'Foo',
      lastName: 'Bar'
    }
    chai.request(server)
    .post('/users')
    .set('x-access-token', tokens.user)
    .send(invalidUser)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      done();
    });
  });
  it('only accepts valid emails', (done) => {
    const invalidEmail = {
      email: 'invalid-email',
      password: 'qwerty',
      first_name: 'Foo',
      last_name: 'Bar',
      roleId: '1',
    }
    chai.request(server)
    .post('/users')
    .set('x-access-token', tokens.user)
    .send(invalidEmail)
    .end((err, res) => {
      res.should.have.status(400);
      console.log(res.body.name);
      expect(res.body.errors[0].type).to.contain("Validation error");
      expect(res.body.errors[0].message).to.contain("Validation isEmail failed");
      expect(res.body.errors[0].path).to.contain('email');
      expect(res.body.name).to.contain('SequelizeValidationError');
      done();
    });
  });
});
describe('DELETE /users/:id', () => {
  it('deletes user', (done) => {
    chai.request(server)
    .delete(`/users/${Users[0].id}`)
    .set('x-access-token', tokens.user)
    .end((err, res)=>{
      res.should.have.status(204);
      done();
    })
  });
});
});
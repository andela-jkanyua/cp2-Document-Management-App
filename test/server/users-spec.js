// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const expect = require('chai').expect;
const Users = require('./helpers/users');
const token = require('./helpers/token');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Users', () => {
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
      .get('/api/users')
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
      .get('/api/users/1')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('firstName');
        done();
      });
    });

    it('allows pagination for users.', (done) => {
      chai.request(server)
      .get('/api/users?limit=2&offset=3')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(2);
        (res.body[0].id).should.be.eql(4);
        (res.body[1].id).should.be.eql(5);
        should.not.exist(res.body[2]);
        done();
      });
    });

    it('ensures Limit and Offset are integers', (done) => {
      chai.request(server)
      .get('/api/users?limit=notInt&offset=notInt')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('Query Parameters are not Integers.');
        done();
      });
    });

    it('allows only user/owner or admin to access user details', (done) => {
      chai.request(server)
      .get('/api/users/1')
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
      .get('/api/users/1/documents')
      .set('x-access-token', tokens.notAdmin)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.success.should.be.eql(false);
        done();
      });
    });

    it('should search a user by username', (done) => {
      chai.request(server)
      .get('/api/search/users/?q=JaneD')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].email).to.contain('janedoe@example.com');
        done();
      });
    });

    it('should return appropriate message if username not found', (done) => {
      chai.request(server)
      .get('/api/search/users/?q=usernoexist')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eql('No Users Found.');
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
      .post('/api/users')
      .send(Users[1])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.success.should.be.eql(true);
        done();
      });
    });

    it('should return error if email is not unique', (done) => {
      chai.request(server)
      .post('/api/users')
      .send(Users[1])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql("Dublicate email error. Email must be unique");
        done();
      });
    });
    it('should NOT POST a user without all fields', (done) => {
      const invalidUser = {
        email: 'test@test.com',
        password: 'password',
        firstName: 'Foo',
        lastName: 'Bar',
      };
      chai.request(server)
      .post('/api/users')
      .set('x-access-token', tokens.user)
      .send(invalidUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql(`Please provide 'email', 'password', 'username', 'firstName', 'lastName', 'roleId'` );
        done();
      });
    });

    it('only accepts valid emails', (done) => {
      const invalidEmail = {
        email: 'invalid-email',
        password: 'qwerty',
        username: 'username',
        firstName: 'Foo',
        lastName: 'Bar',
        roleId: '1',
      };
      chai.request(server)
      .post('/api/users')
      .set('x-access-token', tokens.user)
      .send(invalidEmail)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('Not a valid email address');
        done();
      });
    });
  });
  describe('PUT /users/:id', () => {
    it('should update a user', (done) => {
      chai.request(server)
      .put('/api/users/2')
      .set('x-access-token', tokens.user)
      .send({ email: 'updated@email.com' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.email.should.be.eql('updated@email.com');
        done();
      });
    });

    it('user can only edit own details', (done) => {
      chai.request(server)
      .put('/api/users/1')
      .set('x-access-token', tokens.notAdmin)
      .send({ email: 'updated@email.com' })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.be.eql('Owner or Admin Users Only');
        res.body.success.should.be.eql(false);
        done();
      });
    });
  });
  describe('DELETE /users/:id', () => {
    it('deletes user', (done) => {
      chai.request(server)
      .delete(`/api/users/${Users[0].id}`)
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });
  });
});

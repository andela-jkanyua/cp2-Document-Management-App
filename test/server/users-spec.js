//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const should = chai.should();
const expect = require('chai').expect;

let Users //<-- add require  user model here..
const user = {
  email: "test@example.com",
  password: "password",
  role: 'admin',
  firstName: 'Foo',
  lastName: 'Bar'
}
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
//Our parent block

/* describe('Users', () => {
    beforeEach((done) => { // Before each test we empty the database
         Users.remove({}, (err) => { 
            done();         
         });     
     });
*/

/*
 * Test the users /GET route
 */
describe('/GET users', () => {
  it('it should GET all the users', (done) => {
    chai.request(server)
    .get('/users')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
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
    .send(user)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.email.should.be.eql('text@example.com');
      done();
    });
  });
  it('should NOT POST a user without all fields', (done) => {
    let user = {
      email: "test@example.com",
      password: "password",
      firstName: 'Foo',
      lastName: 'Bar'
    }
    chai.request(server)
    .post('/users')
    .send(user)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.have.property('role');
      res.body.errors.role.should.have.property('kind').eql('required');
      done();
    });
  });
  it('only accepts valid emails and usernames', (done) => {
    chai.request(server)
    .post('/users')
    .send({
      username: '!@#$%^&*',
      email: '!@#$%^&*',
      password: 'qazwsxedc',
      first_name: 'Foo',
      last_name: 'Bar',
    })
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.error).to.contain('Invalid input');
      expect(res.body.messages).to.contain.all.keys('email', 'username');
      expect(res.body.messages.email).to.contain('not a valid email address');
      expect(res.body.messages.username).to.contain(`A username can only contain alphanumeric characters or an underscore`);
      done();
    });
  });
});
describe('DELETE /users/:id', () => {
  it('deletes user', (done) => {
      expect(3).to.equal(4)
      done();
    });
});

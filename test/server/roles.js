//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const should = chai.should();
const expect = require('chai').expect;
const usersController = require('../../server/controllers').roles;


//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
//Our parent block

/*
 * Test the users /GET route
 */
describe('/GET roles', () => {
  it('it should GET all the roles', (done) => {
    chai.request(server)
    .get('/roles')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
  it('creates a new role', (done) => {
    chai.request(server)
    .post(`/roles`)
    .send({title: 'New Role',
    	description: 'Role description'})
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });
  it('does not POST invalid role', (done) =>{
  	chai.request(server)
  	.post('/roles')
  	.send({description: 'Role without title'})
  	.end((err,res) =>{
  		res.should.have.status(400);
  		expect(res.body.name).to.contain("SequelizeValidationError");
  		expect(res.body.message).to.contain("notNull Violation: title cannot be null");
  		done();
  	})
  })
});
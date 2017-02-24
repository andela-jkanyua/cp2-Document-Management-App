//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const should = chai.should();
const expect = require('chai').expect;
const documentsController = require('../../server/controllers').documents;
const Documents = require('./helpers/documents');
const Users = require('./helpers/users');
const token = require('./helpers/token');

chai.use(chaiHttp);

describe('Documents', () => {
  const tokens = {};
  before((done) => {
    tokens.user = token.generate(Users[0]);
    done();
  });
    describe('/GET Documents', () => {
      it('returns an array of all documents', (done) => {
        chai.request(server)
        .get('/documents')
        .set('x-access-token', tokens.user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
      });
      it('should GET a specific document', (done) => {
        chai.request(server)
        .get(`/documents/1`)
        .set('x-access-token', tokens.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('title');
          done();
        });
      });
    });
    describe('/POST documents', () => {
      it('should POST a document with all fields', (done) => {
        chai.request(server)
        .post('/documents')
        .set('x-access-token', tokens.user)
        .send(Documents[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.title.should.be.eql('Helpful Spouse');
          done();
        });
      });
      it('should update a document', (done) => {
        chai.request(server)
        .put(`/documents/1`)
        .set('x-access-token', tokens.user)
        .send({title: 'Updated Title'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.title.should.be.eql('Updated Title');
          done();
        });
      });
      it('should Not POST a document without a title', (done) => {
        chai.request(server)
        .post('/documents')
        .set('x-access-token', tokens.user)
        .send({content: 'Document with content only'})
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.name).to.contain('SequelizeValidationError');
          done();
        });
      });
      it('should search documents for a term', (done) => {
        chai.request(server)
        .post('/search/documents')
        .set('x-access-token', tokens.user)
        .send({search: 'Lorem'})
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.contain('Lorem ipsum dolor sit amet');
          done();
        });
      });
    });

describe('/DELETE documents/:id', () => {
  it('deletes document', (done) => {
    chai.request(server)
    .delete(`/documents/${Documents[0]._id}`)
    .set('x-access-token', tokens.user)
    .end((err, res)=>{
      res.should.have.status(204);
      done();
    })
  });
});
});
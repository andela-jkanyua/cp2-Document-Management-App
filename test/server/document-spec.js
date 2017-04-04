// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');
const expect = require('chai').expect;
const Documents = require('./helpers/documents');
const Users = require('./helpers/users');
const token = require('./helpers/token');

const should = chai.should();

chai.use(chaiHttp);

describe('Documents', () => {
  const tokens = {};
  before((done) => {
    tokens.user = token.generate(Users[0]);
    tokens.notAdmin = token.generate(Users[1]);
    done();
  });

  describe('/GET Documents', () => {
    it('returns an array of all public documents', (done) => {
      chai.request(server)
        .get('/api/documents')
        .set('x-access-token', tokens.user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('returns a specific document', (done) => {
      chai.request(server)
        .get('/api/documents/2')
        .set('x-access-token', tokens.user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.eql(2);
          done();
        });
    });

    it('ensures non-owner cannot GET a document', (done) => {
      chai.request(server)
        .get('/api/users/1/documents')
        .set('x-access-token', tokens.notAdmin)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          res.body.success.should.be.eql(false);
          done();
        });
    });

    it('returns appropriate message if a document is not found', (done) => {
      chai.request(server)
        .get('/api/documents/22')
        .set('x-access-token', tokens.notAdmin)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.an('object');
          res.body.success.should.be.eql(false);
          res.body.message.should.be.eql('No such Document')
          done();
        });
    });

    it('ensures owner/admin can GET a specific document', (done) => {
      chai.request(server)
        .get('/api/users/1/documents')
        .set('x-access-token', tokens.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });

    it('returns appropriate message if user has no documents', (done) => {
      chai.request(server)
        .get('/api/users/12/documents')
        .set('x-access-token', tokens.user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.message.should.eql('User has no Documents')
          done();
        });
    });

    it('allows pagination for users.', (done) => {
      chai.request(server)
      .get('/api/documents?limit=1&offset=1')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        // Please note that we delete some documents in describe DELETE
        res.should.have.status(200);
        res.body.length.should.be.eql(1);
        should.not.exist(res.body[2]);
        done();
      });
    });

    it('ensures Limit and Offset are integers', (done) => {
      chai.request(server)
      .get('/api/documents?limit=notInt&offset=notInt')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('Query Parameters are not Integers.');
        done();
      });
    });

    it('should search documents title for a term', (done) => {
      chai.request(server)
      .get('/api/search/documents/?q=Lorem')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].title).to.contain('Lorem ipsum dolor sit amet');
        done();
      });
    });

    it('should search documents content for a term', (done) => {
      chai.request(server)
      .get('/api/search/documents/?q=solmen')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].title).to.contain('Li Europan lingues es membres');
        done();
      });
    });

    it('should return appropriate message if document not found', (done) => {
      chai.request(server)
      .get('/api/search/documents/?q=documentnoexist')
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.eql('No Documents found.');
        done();
      });
    });
  });

  describe('/POST documents', () => {
    it('should POST a document with all fields', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', tokens.user)
        .send(Documents[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.title.should.be.eql('Helpful Spouse');
          done();
        });
    });

    it('should Not POST a document without a title', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', tokens.user)
        .send({ content: 'Document with content only' })
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.name).to.contain('SequelizeValidationError');
          done();
        });
    });
  });

  describe('/UPDATE documents/:id', () => {
    it('should update a document', (done) => {
      chai.request(server)
        .put('/api/documents/1')
        .set('x-access-token', tokens.user)
        .send({ title: 'Updated Title' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.title.should.be.eql('Updated Title');
          done();
        });
    });

    it('ensures only owner should update a document', (done) => {
      chai.request(server)
        .put('/api/documents/4')
        .set('x-access-token', tokens.notAdmin)
        .send({ title: 'Updated Title' })
        .end((err, res) => {
          res.should.have.status(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Only Owner or Admin can access');
          done();
        });
    });
  });

  describe('/DELETE documents/:id', () => {
    it('deletes document', (done) => {
      chai.request(server)
      .delete(`/api/documents/${Documents[0].id}`)
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });

    it('does not delete non-existing document', (done) => {
      chai.request(server)
      .delete(`/api/documents/88`)
      .set('x-access-token', tokens.user)
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('No such Document');
        done();
      });
    });

    it('ensures user cannot delete a document created by other user', (done) => {
      chai.request(server)
      .delete(`/api/documents/${Documents[3].id}`)
      .set('x-access-token', tokens.notAdmin)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    });
  });
});

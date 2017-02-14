const chai = require('chai');
const expect = require('chai').expect;
const server = require('../../server/server');
//const Document = require('../../server/models/Document');

describe('Documents', () => {
  describe('API endpoints', () => {
    before((done) => {
      done();
    });
    describe('GET Documents', () => {
      it('returns an array of all documents', (done) => {
        chai.request(server)
        .get('/documents')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
      });
    });
  });
});
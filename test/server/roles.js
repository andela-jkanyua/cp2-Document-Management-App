const chai = require('chai');
const expect = require('chai').expect;
const server = require('../../server/server');
//const Role = require('../../server/models/role');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Roles', () => {
  describe('API endpoints', () => {
    before((done) => {
      done();
    });
    describe('GET roles', () => {
      it('returns an array of all roles', (done) => {
        chai.request(server)
        .get('/api/roles')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
      });
    });
  });
});
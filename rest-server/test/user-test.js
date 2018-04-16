const chai = require('chai');
const server = require('../app');
const chaiHttp = require('chai-http');
const should = chai.should();

const jwt = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZDIyZmUzYjBiNjBiOTFkN2NiODViMyIsInVzZXJuYW1lIjoiYWJjIiwiZmlyc3ROYW1lIjoiQ2hyaXMiLCJsYXN0TmFtZSI6IkxpIiwicGFzc3dvcmQiOiIkMmEkMTAkYk5xc0FOUWF4b2pEcm92aExDRjJEZWFTeFhLTUE2bDFpc3Mvbnp6QmtTL1NkaGh0V0NQVDYiLCJlbWFpbCI6ImFiY0B3b3JsZC5jb20iLCJhYm91dE1lIjoiVGhpcyBpcyBNZSJ9LCJpYXQiOjE1MjM4MzU4NTR9.Id5zGWGPEvoyPxq_kN5mW_3FN8z9q4LHaa6-UKrN_4Q'

chai.use(chaiHttp);

describe('REST Server tests', () => {

  describe('Users', () => {
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .set('Authorization', jwt)
        .end((err, res) => {
          res.should.have.status(200);
          json = JSON.parse(res.text);
          json.should.be.an('array');
          json.length.should.be.at.least(3);
          done();
        })
    });

    it('it should Login', (done) => {
      chai.request(server)
        .post('/api/users/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'abc', password: '123'})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    });

    it('it should update user', (done) => {
      chai.request(server)
        .put('/api/users/abc')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', jwt)
        .send({
          email: "my@email.com",
          aboutMe: "Hello hello"})
        .end((err, res) => {
          res.should.have.status(200);
          json = JSON.parse(res.text);
          json.email.should.eql("my@email.com");
          json.aboutMe.should.eql("Hello hello");
          done();
        })
    });
  });

  describe('Projects', () => {
    it('it should GET all projects', (done) => {
      chai.request(server)
        .get('/api/projects')
        .set('Authorization', jwt)
        .end((err, res) => {
          res.should.have.status(200);
          json = JSON.parse(res.text);
          json.should.be.an('array');
          json.length.should.be.at.least(3);
          done();
        })
    });

    it('it should GET all files', (done) => {
      chai.request(server)
        .get('/api/proj-files')
        .set('Authorization', jwt)
        .end((err, res) => {
          res.should.have.status(200);
          json = JSON.parse(res.text);
          json.should.be.an('array');
          json.length.should.be.at.least(1);
          done();
        })
    })
  });

});

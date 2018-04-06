const chai = require('chai');
const server = require('../app');
const chaiHttp = require('chai-http');
const should = chai.should();

/*
chai.use(chaiHttp);
describe('Users', ()=>{

  describe('/GET users', ()=>{
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          json = JSON.parse(res.text);
          json.should.be.an('array');
          json.length.should.be.eql(2);
          done();
        })
    })
  })

});*/

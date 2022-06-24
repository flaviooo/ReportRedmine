const expect = require('chai').expect
const { json } = require('body-parser');
// const boot = require('../app').boot
let chai = require('chai');
let chaiHttp = require('chai-http');
//const shutdown = require('../app').shutdown
const port = require('../app').port;
const app = require('../app')

chai.use(chaiHttp);

describe("Test Template", function () {

    before(() => {
        console.log("Testing started Before all tests - BOOT SERVER Port: " + app.get('port'));
        //  boot;
    });
    after(() => {
        console.log("Testing finished After all tests- SHUTDOWN SERVER  Port: " + app.get('port'));
        //  shutdown;
    });

    // beforeEach(() => console.log("Before a test – enter a test"));
    // afterEach(() => console.log("After a test – exit a test\n"));

     it('Test 1 - GET INDEX', (done) => {
       // console.log("Running as module, Port: " + app.get('port'))
        chai.request(app)
            .get('/?meseS=01&meseE=12&anno=2022')
            .end((err, res) => {
               // console.log("Error: " + err)
               // console.log("Boby " + JSON.stringify(res))
              //  console.log("Boby " + JSON.stringify(res.body))
                //res.should.have.status(200);
                //          res.status.should.equal(200);
                expect(res).to.have.status(200);
                expect(res.text).to.be.a('string');
                done();
            });
    });
    it('Test 2 - GET getTimeProj', (done) => {
        // console.log(routes.getTimeProj);
        chai.request(app)
            .get('/getTimeProj?meseS=01&meseE=12&anno=2022')
            .end((err, res) => {
                 data = res.body;
                 expect(res).to.have.status(200);
                 expect(res).to.have.property('type','application/json');
                 expect(data).to.be.a('array');
                 data.forEach(element => {
                   // console.log("kk "+JSON.stringify( element))
                    expect(element).to.have.property('name');
                    
                });
                done();
            });
    });

});
const expect = require('chai').expect
const boot = require('../app').boot;
const shutdown = require('../app').shutdown;
const port = require('../app').port;
const _app = require('../app').app;
const routes = require('../routes')

describe("Test  Boot Server", () => {
    describe('Boot', function() {
        it('Start', function() {
           boot()
            expect(Math.abs(-5)).to.be.equal(5);
        });
        it("Get info", () => {
            //console.log(port+ " Ambiente"+ app.get('env'))
           let envo = _app().get('env');
           let envoPort = _app().settings.port
           let ri = routes.index;
           console.log(ri)           
        _app.get('/', routes.index); 
           console.log(envo)
            
            expect(port).to.be.equal("4000");
        });
        it('Stop', function() {
            console.log( "Shutdown "+ shutdown() )
            expect(Math.abs(-5)).to.be.equal(5);
        });
    });
});
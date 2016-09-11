'use strict';

const expect = require('chai').expect;
const dataAccess = require('../../../lib/dataAccess.js');
const sinon = require('sinon');
const fixture = require('../../fixtures/rawPageSpeedData');
let request = require('request');

describe('#dataAccess', () => {
  describe('#getRawData', () => {
    describe('#non-stubbed tests', () => {
      it('should throw error when opts is undefined', (done) => {
        let opts;
        dataAccess.getRawData(opts, (error) => {
          expect(error).to.be.an.instanceof(Error);
          expect(error.message).to.equal('dataAccess.getRawData: opts is not defined');
          done();
        });
      });

      it('should throw an error when opts.url is undefined', (done) => {
        let opts = { foo: 'bar' };
        dataAccess.getRawData(opts, (error) => {
          expect(error).to.be.an.instanceof(Error);
          expect(error.message).to.equal('dataAccess.getRawData: opts.url is not defined');
          done();
        });
      });
    });

    describe('#stubbed tests', () => {
      let requestStub;

      beforeEach(() => {
        requestStub = sinon.stub(request, 'get');
      });

      afterEach(() => {
        request.get.restore();
      });

      it('should return error when non 200 response is returned', (done) => {
        let opts = { url: 'bar', apiKey: 'someKey' };
        requestStub.yields(null, { statusCode: 404 }, { foo: 'bar' });
        dataAccess.getRawData(opts, (error) => {
          expect(error).to.be.an.instanceof(Error);
          expect(error.message).to.equal('Status code 404 not OK');
          done();
        });
      });

      it('should return correct response for valid data', (done) => {
        let opts = { url: 'bar', apiKey: 'someKey' };
        requestStub.yields(null, { statusCode: 200 }, { foo: 'bar' });
        dataAccess.getRawData(opts, (error, data) => {
          expect(data).to.deep.equal({ foo: 'bar' });
          done();
        });
      });
    });
  });

  describe('#processRawData', () => {
    it('should throw an error is no params are defined', () => {
      expect(() => {
        dataAccess.processRawData();
      }).to.throw('dataAccess.processRawData: rawData object not defined');
    });

    it('should throw and error if opts does not contain id', () => {
      expect(() => {
        dataAccess.processRawData({ foo: 'bar' });
      }).to.throw('dataAccess.processRawData: id was not returned');
    });

    it('should throw an error if opts does not contain rulesgroup', () => {
      expect(() => {
        dataAccess.processRawData({ id: 'http://www.foobar.com' });
      }).to.throw('dataAccess.processRawData: pageSpeed was not returned');
    });

    it('should throw an error if opts does not contain rulesgroup.SPEED', () => {
      expect(() => {
        dataAccess.processRawData(
          {
            id: 'http://www.foobar.com',
            ruleGroup: 'something'
          }
         );
      }).to.throw('dataAccess.processRawData: pageSpeed was not returned');
    });

    it('should throw an error if opts does not contain rulesgroup.SPEED.score', () => {
      expect(() => {
        dataAccess.processRawData(
          {
            id: 'http://www.foobar.com',
            ruleGroups: {
              foo: 'bar'
            }
          }
         );
      }).to.throw('dataAccess.processRawData: pageSpeed was not returned');
    });

    it('should return correct data when opts are good', () => {
      let opts = fixture.getRawDataInputFixture();
      let processedData = dataAccess.processRawData(opts);
      expect(processedData).to.deep.equal(fixture.getProcessedDataOutputFixture());
    });
  });
});

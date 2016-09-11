'use strict';

const expect = require('chai').expect;
const dataAccess = require('../../../lib/dataAccess.js');
const sinon = require('sinon');
const fixture = require('../../fixtures/rawPageSpeedData');

let rp = require('request-promise');

describe('#dataAccess', () => {

  describe('#getRawData', () => {

    describe('#non-stubbed tests', () => {
      it('should throw error when opts is undefined', () => {
        return dataAccess.getRawData()
          .catch(err => {
            expect(err).to.be.an.instanceof(Error);
            expect(err.message).to.equal('dataAccess.getRawData: url not defined');
          });
      });

      it('should throw an error when opts.url is undefined', () => {
        return dataAccess.getRawData({})
          .catch(err => {
            expect(err).to.be.an.instanceof(Error);
            expect(err.message).to.equal('dataAccess.getRawData: url not defined');
          });
      });

      it('should throw an error when invalid url is supplied', () => {
        return dataAccess.getRawData({ url: 'foo' })
          .catch(err => {
            expect(err).to.be.an.instanceof(Error);
            expect(err.message).to.equal('dataAccess.getRawData: ' +
              'RequestError: Error: Invalid URI "foo"');
          });
      });
    });

    describe('#stubbed tests', () => {
      let rpStub;

      beforeEach(() => {
        rpStub = sinon.stub(rp, 'get');
      });

      afterEach(() => {
        rp.get.restore();
      });
      it('should return error when non 200 response is returned', () => {
        rpStub.returns(Promise.resolve({
          statusCode: 404,
          body: {
            foo: 'bar'
          }
        }));

        return dataAccess.getRawData({ url: 'boo' })
          .catch(err => {
            expect(err).to.be.an.instanceof(Error);
            expect(err.message).to.equal('dataAccess.getRawData: Error: dataAccess.getRawData: ' +
              'Status code 404 not OK');
          });
      });

      it('should return correct response for valid url', () => {
        rpStub.returns(Promise.resolve({
          statusCode: 200,
          body: {
            foo: 'bar'
          }
        }));

        return dataAccess.getRawData({ url: 'foo' })
          .then(res => {
            expect(res).to.deep.equal({
              foo: 'bar'
            });
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

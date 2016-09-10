'use strict';

const expect = require('chai').expect;
const dataAccess = require('../../../lib/dataAccess.js');
const sinon = require('sinon');
let rp = require('request-promise');

describe('#dataAccess', () => {
  describe('#getRawData', () => {
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

    it('should return correct response for valid url', () => {
      let rpStub = sinon.stub(rp, 'get');
      rpStub.returns(Promise.resolve({
        data: 'goodData'
      }));

      return dataAccess.getRawData({ url: 'foo' })
        .then(res => {
          expect(res).to.deep.equal({
            data: 'goodData'
          });
        });
    });
  });
});

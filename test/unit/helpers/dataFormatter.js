'use strict';

/* eslint-disable no-unused-expressions,no-useless-escape,no-underscore-dangle */
const expect = require('chai').expect;
const dataFormatter = require('../../../helpers/dataFormatter.js');
const sinon = require('sinon');

describe('#dataFormatter', () => {
  describe('#buildSummary', () => {
    it('should call internal _mapObject correctly', () => {
      let mapObjectSpy = {
        _mapObject: sinon.spy()
      };
      dataFormatter.buildSummary({});
      expect(mapObjectSpy).to.have.been.calledOnce;
    });
  });

  describe('#buildRulesInfo', () => {
    it('should return undefined when params are not given', () => {
      expect(dataFormatter.buildRulesInfo()).to.be.undefined;
    });

    it('should return undefined when params array is empty', () => {
      expect(dataFormatter.buildRulesInfo([])).to.be.undefined;
    });

    it('should return data object when params array ' +
      'contains only 1 header and no urlBlocks', () => {
      let testInput = [
        {
          header: {
            format: 'This is a very simple header'
          }
        }
      ];
      expect(dataFormatter.buildRulesInfo(testInput)).to.deep.equal([{
        header: 'This is a very simple header',
        urlsToFix: []
      }]);
    });

    it('should return data object with denormalized headers when ' +
        'array contains only 1 header and no urlBlocks', () => {
      let testInput = [
        { header: {
          format: '{{BEGIN_LINK}}Remove render-blocking JavaScript{{END_LINK}}',
          args: [
            {
              type: 'HYPERLINK',
              key: 'LINK',
              value: 'https://developers.google.com/speed/docs/insights/BlockingJS'
            }
          ]
        } }];
      expect(dataFormatter.buildRulesInfo(testInput)).to.deep.equal([{
        header: '<a href=\"https://developers.google.com/speed/docs/insights/BlockingJS\">Remove render-blocking JavaScript</a>',
        urlsToFix: []
      }]);
    });

    it('should return data object when params contains headers and 1 simple urlblock', () => {
      let testInput = [
        {
          header: {
            format: 'This is a simple header'
          },
          urls: [
            {
              result: {
                format: 'simple url'
              }
            }
          ]
        }
      ];
      expect(dataFormatter.buildRulesInfo(testInput)).to.deep.equal([{
        header: 'This is a simple header',
        urlsToFix: ['simple url']
      }]);
    });

    it('should return denormalized beautiful data object ' +
        'when params contains headers and urls', () => {
      let testInput = [
        {
          header: {
            format: 'This is a simple header'
          }
        },
        {
          header: {
            format: '{{BEGIN_LINK}}Remove render-blocking JavaScript{{END_LINK}}',
            args: [
              {
                type: 'HYPERLINK',
                key: 'LINK',
                value: 'https://developers.google.com/speed/docs/insights/BlockingJS'
              }
            ]
          },
          urls: [
            {
              result: {
                format: '{{KEY}} is to be replaced {{ANOTHER_KEY}}',
                args: [
                  {
                    type: 'STRING',
                    key: 'KEY',
                    value: 'string from value'
                  },
                  {
                    type: 'STRING',
                    key: 'ANOTHER_KEY',
                    value: 'much wow'
                  }
                ]
              }
            },
            {
              result: {
                format: '{{KEY}} is to be replaced',
                args: [
                  {
                    type: 'STRING',
                    key: 'KEY',
                    value: 'url2'
                  }
                ]
              }
            }
          ]
        }
      ];
      expect(dataFormatter.buildRulesInfo(testInput)).to.deep.equal([
        {
          header: 'This is a simple header',
          urlsToFix: []
        },
        {
          header: '<a href=\"https://developers.google.com/speed/docs/insights/BlockingJS\">Remove render-blocking JavaScript</a>',
          urlsToFix: [
            'string from value is to be replaced much wow',
            'url2 is to be replaced'
          ]
        }
      ]);
    });
  });

  describe('#_mapObject', () => {
    it('should return empty string when params are not given', () => {
      expect(dataFormatter._mapObject()).to.equal('');
    });

    it('should return empty string when opts.format are not given', () => {
      let opts = {};
      opts.foo = 'bar';
      expect(dataFormatter._mapObject(opts)).to.equal('');
    });

    it('should return correctly formatted data when opts.format ' +
      'is given but opts.arg is not', () => {
      let opts = {};
      opts.format = 'Testing format';
      expect(dataFormatter._mapObject(opts)).to.equal(opts.format);
    });

    it('should return correctly formatted data when only ' +
      'BEGIN and END links are present in format', () => {
      let opts = {};
      opts.format = '{{BEGIN_LINK}}test{{END_LINK}}';
      opts.args = [
        {
          'type': 'HYPERLINK',
          'key': 'LINK',
          'value': 'http://www.foobar.test'
        }
      ];
      expect(dataFormatter._mapObject(opts)).to.equal('<a href="http://www.foobar.test">test</a>');
    });

    it('should return correctly formatted data when general keys are present in format', () => {
      let opts = {};
      opts.format = 'Your page has {{NUM_SCRIPTS}} blocking script ' +
        'resources and {{NUM_CSS}} blocking CSS resources';
      opts.args = [
        {
          type: 'INT_LITERAL',
          key: 'NUM_SCRIPTS',
          value: '5'
        },
        {
          type: 'INT_LITERAL',
          key: 'NUM_CSS',
          value: '4'
        }
      ];
      expect(dataFormatter._mapObject(opts)).to.equal(
        'Your page has 5 blocking script resources and 4 blocking CSS resources');
    });

    it('should return correctly formatted data when args keys does not match format', () => {
      let opts = {};
      opts.format = 'Your page has {{NUM_SCRIPTS}} blocking script ' +
        'resources and {{NUM_CSS}} blocking CSS resources';
      opts.args = [
        {
          type: 'INT_LITERAL',
          key: 'JACKIE',
          value: '5'
        },
        {
          type: 'INT_LITERAL',
          key: 'CHAN',
          value: '4'
        }
      ];
      expect(dataFormatter._mapObject(opts)).to.equal(
        'Your page has  blocking script resources and  blocking CSS resources');
    });
  });
});

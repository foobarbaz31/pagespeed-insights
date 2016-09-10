'use strict';
const lodash = require('lodash');

/**
 * Denormalizes summary information returned by Google API
 * @example
 * // returns 'Your page has 5 blocking script resources and 4 blocking CSS resources'
 * // Usage
 * const dataFormatter = require('dataFormatter');
 * dataFormatter.buildSummary({
    format: 'Your page has {{NUM_SCRIPTS}} blocking script resources and {{NUM_CSS}} blocking CSS resources.',
    args: [
      {
        type: "INT_LITERAL",
        key: "NUM_SCRIPTS",
        value: "5"
      },
      {
        type: "INT_LITERAL",
        key: "NUM_CSS",
        value: "4"
      }
    ]
  });
 * @param {Object} opts - Object containing summary information
 * @param {string} opts.format - Normalized summary string
 * @param {Array} opts.args - Array containing information to denormalize above
 * @return {string} - Denormalized summary info string
 */
function buildSummary(opts) {
  let stringToFormat = _mapObject(opts);
  return stringToFormat;
}

/**
 * Denormalizes url blocks returned by Google API
 * @example
 * // returns
 * [
      {
        "header": "<a href=\"https://developers.google.com/speed/docs/insights/BlockingJS\">Remove render-blocking JavaScript</a>"
        "urlsToFix": []
      }
      {
        "header": "<a href=\"https://developers.google.com/speed/docs/insights/BlockingJS\">Remove render-blocking JavaScript</a>"
        "urlsToFix": [
          "string from value is to be replaced much wow"
          "url2 is to be replaced"
        ]
      }
   ]
 * // Usage
 * const dataFormatter = require('dataFormatter');
 * dataFormatter.buildUrlBlocks([
 * [
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
              type: "HYPERLINK",
              key: "LINK",
              value: "https://developers.google.com/speed/docs/insights/BlockingJS"
            }
          ]
        },
        urls :[
          {
            result: {
              format: '{{KEY}} is to be replaced {{ANOTHER_KEY}}',
              args: [
                {
                  type: "STRING",
                  key: "KEY",
                  value: "string from value"
                },
                {
                  type: "STRING",
                  key: "ANOTHER_KEY",
                  value: "much wow"
                }
              ]
            }
          },
          {
            result: {
              format: '{{KEY}} is to be replaced',
              args: [
                {
                  type: "STRING",
                  key: "KEY",
                  value: "url2"
                }
              ]
            }
          },
        ]
      }
    ]
  ])
 * @param {Array} opts - Array containing url blocks
 * @param {Object} opts[0].headers - Url block headers
 * @param {Array} opts[0].urls - Array of url objects
 * @return {Object} formattedUrlBlocks - Object containing formatted url blocks
 * @return {string} formattedUrlBlocks[0].headers - String defining url block headers
 * @return {Array} formattedUrlBlocks[0].urls - Arrays containing Denormalized url strings
 */
function buildRulesInfo(opts) {
  if (opts === undefined || opts.length <= 0) {
    return;
  }

  let formattedResults = [];
  for(let urlBlock of opts) {
    let tempResult = {};
    tempResult.header = _mapObject(urlBlock.header);
    let tempUrlsArr = [];
    if(urlBlock.urls) {
      for(let tempUrl of urlBlock.urls) {
        let tempFormattedUrl = _mapObject(tempUrl.result);
        tempUrlsArr.push(tempFormattedUrl);
      }
    }
    tempResult.urlsToFix = tempUrlsArr;
    formattedResults.push(tempResult);
  }

  return formattedResults;
}

/**
 * [Internal function] Replaces keys in opt.format with corresponding values from opts.args
 * @param {Object} opts - Object containing summary information
 * @param {string} opts.format - Normalized summary string
 * @param {Array} opts.args - Array containing information to denormalize above
 * @return {string} - Denormalized summary info string
 */
function _mapObject(opts) {
  if (opts === undefined) {
    return '';
  }

  if(opts.format === undefined) {
    return '';
  }

  if(opts.args === undefined || opts.args.length === 0) {
    return opts.format;
  }

  let mapping = {};

  for(let currArg of opts.args) {
    if(currArg.type === 'HYPERLINK') {
      mapping[`BEGIN_${currArg.key}`] = `<a href="${currArg.value}">`;
      mapping[`END_${currArg.key}`] = '</a>';
    } else {
      mapping[currArg.key] = currArg.value;
    }
  }

  let stringToFormat = opts.format;
  stringToFormat = stringToFormat.replace(/\{\{([A-Z0-9_]+)\}\}/g, function(full, matched) {
    let retVal = (mapping[matched]) ? mapping[matched] : '';
    return retVal;
  });
  return stringToFormat;
}

/**
 * Helper method that helps in formatting returned by Google API
 * @module dataFormatter
 */
module.exports = {
  buildSummary,
  buildRulesInfo,
  _mapObject
};

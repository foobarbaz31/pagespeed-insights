'use strict';
const request = require('request-promise');
const dataFormatter = require('../helpers/dataFormatter');
/**
 * Makes call to Google's pagespeed API and fetches data for the url arrays
 * @param {Object} opts - Object containing url
 * @param {string} opts.url - url to fetch pagespeed for
 * @return {Promise<Object>} - Promise to raw data from pagespeed
 */
function getRawData(opts) {
  if (opts === undefined || opts.url === undefined) {
    return Promise.reject(new Error('dataAccess.getRawData: url not defined'));
  }

  let options = {
    uri: opts.url
  };

  return request.get(options)
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(new Error(`dataAccess.getRawData: ${err}`));
    });
}

/**
 * Processes raw data and formats it to a more readable structure
 * @param {Object} rawData - JSON formatted rawData @see {@link getRawData}
 * @return {Promise<Object>} - Promise to processed data from pagespeed
 */
function processRawData(opts) {
  if (opts === undefined || opts.length <= 0) {
    return Promise.reject(new Error('dataAccess.processRawData: rawData object not defined'));
  }

  let processedData = {};

  // Key of processedData is the url
  processedData[opts.id] = {};

  // Pick pagespeed
  if (opts.rulesGroup.SPEED.score === undefined) {
    return Promise.reject(new Error('dataAccess.processRawData: pageSpeed was not returned'));
  }
  processedData[opts.id].pageSpeed = opts.rulesGroup.SPEED.score;

  // Set up keys for severity classification
  processedData[opts.id].high = [];
  processedData[opts.id].low = [];
  processedData[opts.id].medim = [];

  // Iterate over the ruleResults and start placing them in high, low, medium buckets
  let formattedResultsData = opts.formattedResults.ruleResults;
  for (let value of Object.keys(formattedResultsData)) {
    let tempObject = {};

    // Get localisedRuleName
    tempObject.localisedRuleName = formattedResultsData[value].localisedRuleName;

    // Fetch ruleImpact
    tempObject.ruleImpact = formattedResultsData[value].ruleImpact;

    // Build summary data
    tempObject.summary = dataFormatter.buildSummary(formattedResultsData[value].summary);

    // Build url to fix data
    tempObject.urlBlocks = dataFormatter.buildUrlBlocks(formattedResultsData[value].urlBlocks);

    processedData[opts.id].push(tempObject);
  }

  return Promise.resolve(processedData);
}

/**
 * Module that obtains information from Google pagespeed API and formats it
 * @module dataAccess
 */
module.exports = {
  getRawData,
  processRawData
};

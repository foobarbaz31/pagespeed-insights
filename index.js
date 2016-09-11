'use strict';

const dataAccess = require('./lib/dataAccess');

/**
* Accepts url, apiKey, strategy and returns denormalized pagespeed
* @example
* // Usage
* const getPageSpeed = require('getPageSpeed');
* let processedData = getPageSpeed.returnPageSpeed({
*    url: 'http://www.ggogle.com',
*    apiKey: 'APIcmcoif73',
*    strategy: 'mobile',
*  }, function(error, data) {
*    console.log(data);
*  });
* @param {Object} opts - Object containing input parameters to fetch pagespeed
* @param {string} opts.url - Url to fetch pagespeed for
* @param {string} opts.apiKey - apiKey registered with google
* @param {string} opts.strategy - mobile or desktop
* @param {string} opts.requestUrl - Google pagespeed endpoint
* @param {Function} callback - Function to call once data is processed
*/
module.exports = (opts, callback) => {
  dataAccess.getRawData(opts, (error, data) => {
    if (error) {
      return callback(error, null);
    }
    try {
      let processedData = dataAccess.processRawData(JSON.parse(data));
      return callback(null, processedData);
    } catch (err) {
      return callback(err, null);
    }
  });
};

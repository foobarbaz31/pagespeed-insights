#!/usr/bin/env node

/* eslint no-console: "off" */
'use strict';

const clc = require('cli-color');
const pagespeed = require('./../index');
const lodash = require('lodash');

const argv = require('yargs')
  .usage('Usage: pagespeed_cli --url http://www.google.com --apiKey AxjurIBVT0 --strategy mobile')
  .alias('u', 'url')
  .nargs('u', 1)
  .describe('u', 'Url to fetch pagespeed results for')
  .alias('k', 'apiKey')
  .nargs('k', 1)
  .describe('k', 'API key for the Pagespeed Insights API. ' +
    'It is recommeded you pass key for prod usage.')
  .alias('s', 'strategy')
  .describe('s', 'UX strategy to get pagespeed for ')
  .choices('s', ['mobile', 'desktop'])
  .default('s', 'desktop')
  .nargs('s', 1)
  .alias('f', 'full_view')
  .describe('f', 'Pass this option if you want to see full data as returned by the library')
  .boolean(['f'])
  .demand(['u'])
  .help('h')
  .alias('h', 'help')
  .argv;

function processCliOutput(data) {
  const error = clc.red.bold;
  const warn = clc.yellow;
  const notice = clc.blue;

  Object.keys(data).forEach(key => {
    console.log('------------------------------------------------------------------');
    console.log('URL: ' + clc.cyan(key));
    if (data[key].pageSpeed > 80) {
      console.log('Score: ' + notice(data[key].pageSpeed));
    } else if (data[key].pageSpeed > 50) {
      console.log('Score: ' + warn(data[key].pageSpeed));
    } else {
      console.log('Score: ' + error(data[key].pageSpeed));
    }
    console.log('------------------------------------------------------------------');
    console.log('');
    let sortedRules = lodash.sortBy(data[key].rulesInfo, ['ruleImpact']);
    sortedRules = lodash.reverse(sortedRules);
    sortedRules.forEach(rule => {
      console.log(rule.localisedRuleName + '..........' + clc.yellow.bold(rule.ruleImpact));
    });
    console.log('');
    console.log(clc.italic('Please see https://developers.google.com/speed/docs/insights/rules ' +
      'for more information about the rules.'));
    console.log('');
    console.log('');
  });
}


let opts = {
  url: argv.url,
  apiKey: argv.apiKey
};

pagespeed(opts, (error, data) => {
  if (error) {
    console.log(`Error obtaining pagespeed data ${error.message}.`);
    return;
  }
  if (argv.full_view) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }
  processCliOutput(data);
});


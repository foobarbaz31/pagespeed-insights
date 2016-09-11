# pagespeed-insights

This is a library that fetches [Google Pagespeed Insight](https://developers.google.com/speed/pagespeed/insights/) for given url, formats and denormalizes the output in human readable form.

For production usage, please obtain [API Key](https://console.developers.google.com/apis?project=xenon-height-615)

This package also comes with a CLI utility for obtaining pagespeed. Please ses [usage](#CLI) for more information.

## Installation

From npm

```javascript
npm install pagespeed-insights
```

## Usage

### CLI

CLI options are as below:

```javascript
Usage: pagespeed_cli --url http://www.google.com --apiKey AxjurIBVT0 --strategy
mobile

Options:
  -u, --url        Url to fetch pagespeed results for                 [required]
  -k, --apiKey     API key for the Pagespeed Insights API. It is recommeded you
                   pass key for prod usage.
  -s, --strategy   UX strategy to get pagespeed for
                             [choices: "mobile", "desktop"] [default: "desktop"]
  -f, --full_view  Pass this option if you want to see full data as returned by
                   the library                                         [boolean]
  -h, --help       Show help                                           [boolean]
```

Example:

```
> pagespeed_cli --url http://www.google.com 

------------------------------------------------------------------
URL: http://www.shutterstock.com/
Score: 83
------------------------------------------------------------------

Eliminate render-blocking JavaScript and CSS in above-the-fold content..........12
Leverage browser caching..........4.485565476190477
Optimize images..........2.443
Prioritize visible content..........0
Minify JavaScript..........0
Minify HTML..........0
Minify CSS..........0
Reduce server response time..........0
Enable compression..........0
Avoid landing page redirects..........0

Please see https://developers.google.com/speed/docs/insights/rules for more information about the rules.
```

If the CLI is run with the *-f option*, the output returned is same as [library usage](#Returns).

### As a library

When used as a library, the module accepts **url, apiKey, strategy** and returns denormalized human readable data from the pagespeed insights API.

**url**: required parameter.

**apiKey**: recommended that it is passed for prod usage.

**strategy**: can either *mobile or desktop*. Defaults to *desktop*

```javascript
const pagespeedInsights = require('pagespeed-insights');

let opts = {
  url: 'http://www.shutterstock.com',
  apiKey: 'AxkfuV138x',
  strategy: 'mobile'
};

pagespeedInsights(opts, (err, data) => {
  console.log(data);
});
```

#### Returns
```javascript
{
  "http://www.shutterstock.com/": {
    "pageSpeed": 82,
    "rulesInfo": [
      {
        "localisedRuleName": "Avoid landing page redirects",
        "ruleImpact": 0,
        "summary": "Your page has no redirects. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/AvoidRedirects\">avoiding landing page redirects</a>."
      },
      {
        "localisedRuleName": "Enable compression",
        "ruleImpact": 0,
        "summary": "You have compression enabled. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/EnableCompression\">enabling compression</a>."
      },
      {
        "localisedRuleName": "Leverage browser caching",
        "ruleImpact": 4.976851851851852,
        "summary": "Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network.",
        "urlBlocks": [
          {
            "header": "<a href=\"https://developers.google.com/speed/docs/insights/LeverageBrowserCaching\">Leverage browser caching</a> for the following cacheable resources:",
            "urlsToFix": [
              "http://tag.bounceexchange.com/1406/i.js (60 seconds)",
              "http://d3cxv97fi8q177.cloudfront.net/foundation-A35053-1a4e-4aac-bf5e-08a4b85602231.js (5 minutes)"
            ]
          }
        ]
      },
      {
        "localisedRuleName": "Reduce server response time",
        "ruleImpact": 0,
        "summary": "Your server responded quickly. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/Server\">server response time optimization</a>."
      },
      {
        "localisedRuleName": "Minify CSS",
        "ruleImpact": 0,
        "summary": "Your CSS is minified. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/MinifyResources\">minifying CSS</a>."
      },
      {
        "localisedRuleName": "Minify HTML",
        "ruleImpact": 0,
        "summary": "Your HTML is minified. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/MinifyResources\">minifying HTML</a>."
      },
      {
        "localisedRuleName": "Minify JavaScript",
        "ruleImpact": 0,
        "summary": "Your JavaScript content is minified. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/MinifyResources\">minifying JavaScript</a>."
      },
      {
        "localisedRuleName": "Eliminate render-blocking JavaScript and CSS in above-the-fold content",
        "ruleImpact": 12,
        "summary": "Your page has 5 blocking script resources and 4 blocking CSS resources. This causes a delay in rendering your page.",
        "urlBlocks": [
          {
            "header": "None of the above-the-fold content on your page could be rendered without waiting for the following resources to load. Try to defer or asynchronously load blocking resources, or inline the critical portions of those resources directly in the HTML.",
            "urlsToFix": []
          },
          {
            "header": "<a href=\"https://developers.google.com/speed/docs/insights/BlockingJS\">Remove render-blocking JavaScript</a>:",
            "urlsToFix": [
              "http://www2.shutterstock.com/base/public/js/common-head-3bd0063ac8.js"
            ]
          },
          {
            "header": "<a href=\"https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery\">Optimize CSS Delivery</a> of the following:",
            "urlsToFix": [
              "http://www2.shutterstock.com/base/public/css/app-40d08c3363.css"
            ]
          }
        ]
      },
      {
        "localisedRuleName": "Optimize images",
        "ruleImpact": 2.443,
        "summary": "Properly formatting and compressing images can save many bytes of data.",
        "urlBlocks": [
          {
            "header": "<a href=\"https://developers.google.com/speed/docs/insights/OptimizeImages\">Optimize the following images</a> to reduce their size by 22.8KiB (16% reduction).",
            "urlsToFix": [
              "Compressing http://ak.picdn.net/assets/cms/817ebf1c7395bfbf9cf73233a334882593f75f38-blog_image.jpg could save 11.7KiB (12% reduction).",
              "Compressing http://ak.picdn.net/assets/cms/f87a2acad5057eeb51209064542358035f416452-img_icons_2x.jpg could save 3.3KiB (17% reduction)."
            ]
          }
        ]
      },
      {
        "localisedRuleName": "Prioritize visible content",
        "ruleImpact": 0,
        "summary": "You have the above-the-fold content properly prioritized. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent\">prioritizing visible content</a>."
      }
    ]
  }
}
```


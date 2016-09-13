# pagespeed-insights

[![Build Status](https://travis-ci.org/shwetasabne/pagespeed-insights.svg?branch=master)](https://travis-ci.org/shwetasabne/pagespeed-insights)

This is a library that fetches [Google Pagespeed Insight](https://developers.google.com/speed/pagespeed/insights/) for given url, formats and denormalizes the output in human readable form.

For production usage, please obtain [API Key](https://console.developers.google.com/apis?project=xenon-height-615)

This package also comes with a CLI utility for obtaining pagespeed. Please see [usage](#cli) for more information.

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
> pagespeed_cli -u https://www.google.com/search?q=chocolates 
------------------------------------------------------------------
URL: https://www.google.com/search?q=chocolates
Score: 99
------------------------------------------------------------------

Leverage browser caching..........0.49975198412698413
Prioritize visible content..........0
Optimize images..........0
Eliminate render-blocking JavaScript and CSS in above-the-fold content..........0
Minify JavaScript..........0
Minify HTML..........0
Minify CSS..........0
Reduce server response time..........0
Enable compression..........0
Avoid landing page redirects..........0

Please see https://developers.google.com/speed/docs/insights/rules for more information about the rules.
```

If the CLI is run with the *-f option*, the output returned is same as [library usage](#returns).

### As a library

When used as a library, the module accepts **url, apiKey, strategy** and returns denormalized human readable data from the pagespeed insights API.

**url**: required parameter.

**apiKey**: recommended that it is passed for prod usage.

**strategy**: can either *mobile or desktop*. Defaults to *desktop*

```javascript
const pagespeedInsights = require('pagespeed-insights');

let opts = {
  url: 'https://www.google.com/search?q=chocolates',
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
  "https://www.google.com/#q=chocolates": {
    "pageSpeed": 99,
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
        "ruleImpact": 0.4998784722222222,
        "summary": "Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network.",
        "urlBlocks": [
          {
            "header": "<a href=\"https://developers.google.com/speed/docs/insights/LeverageBrowserCaching\">Leverage browser caching</a> for the following cacheable resources:",
            "urlsToFix": [
              "https://www.google.com/maps/vt/data=RfCSdfNZ0LFPrHSm0ublXdzhdrDFhtmHhN1u-gM,rySAMorOvXy5MCje9kcgVR5K9sB7Ik2LLoxa2YH7cguSY-1tZDmRe5Cx4cBQgz8XjicrUF227LDBmK1sSuTa-K6e3Q5muaYr2iU5oAH6PUq_JgfTPYyM1bBwZnBbcSnzv2wCsZP8oKNqT9Dcyz1ch6vjaJvOTULyuludMJjxs5Epn4adI1GJA220-KxGNtNoCzPXKcpfRJ9ZlPNA1wWBPtvz-G9tKpNj28TNuKl1i-CNAn8kvj88n6aKabhxM2PXS5I21uuUND9S4-LsTLKvLJi9XkvEg7eyl2hwcCONUOhwh86noKdEUHt96GnQ_EaCoIv6nahZOjafbSvYTLpQuJ_XbfX1WJMjhbnPkYmq-FOPASqkZsqyjtQx4qMYLtcVIEvfa-sJhbVZRAUkrxv3_IKIbsQpqRJv9ciykxcqoMJh3BBmMS0QHhI3YWRSRZwzB-9HzS_NhGy-7LSd_cQaqiHg01_SgdZpWITRYCDEOK92A73hkpxbXTFmWYmRDITJ7hf5ZjgUHnaaqz_-_HiIKsLjcu36fXcFSU4u-buWJkflOdLgzg3qUH_mWmNJkNyYcEkC3nfLkNrs1Kk_iKXxyJpcUXiV8yqa_UAS4LjlJJ3rV3c1ssZ8GlB34sLPsHathJuMDLAEFGJYKuLNC9LmSPSPJGBVs5n2v4V7T4mEjM1ReCW2T_kd5I_4UQvtI0uEPNoH5MDPD396tD8S-AA-CB-foO_SHrdSRMdYmSw1iNNzqyOLe3u9B4PuyftB-OuxT-GncEa6Rabe9_IMI-8hXAUuV18SN4ggQVLQah0r2L_BhEvn2MzFutX_SLcrbYGeCzibIi2wZEZFCwFuNBt3qqVJ1Sm56abMmIsP6xOkoNUCoEgsXwmyAtXQ0neyNsEYjzG1ZIKDe2ksTK5oBi7SZT9bSLZp5Y9upLSN6GmKz_T1Xfps9baHlp5CgOQTMmNLDmHbmGmXVFfgX-YJaE64mnAIUCdcxqIoBF4fwqPikxMEn7mwccdFaX5QckeX8QgMi-s8ZM5D0zLsN0nqAmiNGHKLSJ1gBPQKe_XkYqc (2.4 minutes)"
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
        "ruleImpact": 0,
        "summary": "You have no render-blocking resources. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/BlockingJS\">removing render-blocking resources</a>."
      },
      {
        "localisedRuleName": "Optimize images",
        "ruleImpact": 0,
        "summary": "Your images are optimized. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/OptimizeImages\">optimizing images</a>."
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


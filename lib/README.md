## Modules

<dl>
<dt><a href="#module_dataAccess">dataAccess</a></dt>
<dd><p>Module that obtains information from Google pagespeed API and formats it</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getRawData">getRawData(opts)</a> ⇒</dt>
<dd><p>Makes call to Google&#39;s pagespeed API and fetches data for the url arrays</p>
</dd>
<dt><a href="#processRawData">processRawData(rawData)</a> ⇒ <code>Object</code></dt>
<dd><p>Processes raw data and formats it to a more readable structure</p>
</dd>
</dl>

<a name="module_dataAccess"></a>

## dataAccess
Module that obtains information from Google pagespeed API and formats it

<a name="getRawData"></a>

## getRawData(opts) ⇒
Makes call to Google's pagespeed API and fetches data for the url arrays

**Kind**: global function  
**Returns**: callback - callback with raw data from pagespeed  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Object containing url to process, API key |
| opts.requestUrl | <code>string</code> | Google's endpoint to fetch pagespeed |
| opts.url | <code>string</code> | url to fetch pagespeed for |
| opts.apiKey | <code>string</code> | apiKey |
| opts.strategy | <code>string</code> | desktop or mobile |

**Example**  
```js
// returns callback(err, data)
// Usage
const dataAccess = require('dataAccess');
return dataAccess.getRawData({
  url : 'foobar.com',
  apiKey: 'XYXYXY',
  strategy: 'mobile'
}, function(err, data){
  console.log(data);
});
```
<a name="processRawData"></a>

## processRawData(rawData) ⇒ <code>Object</code>
Processes raw data and formats it to a more readable structure

**Kind**: global function  
**Returns**: <code>Object</code> - processedData - Processed denormalized data  

| Param | Type | Description |
| --- | --- | --- |
| rawData | <code>Object</code> | JSON formatted rawData [getRawData](#getRawData) |

**Example**  
```js
// returns {
    'http://www.shutterstock.com/': {
      'pageSpeed': 83,
      'rulesInfo': [
        {
          'localisedRuleName': 'Avoid landing page redirects',
          'ruleImpact': 0,
          'summary': 'Your page has no redirects. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/AvoidRedirects\">avoiding landing page redirects</a>.'
        },
        {
          'localisedRuleName': 'Enable compression',
          'ruleImpact': 0,
          'summary': 'You have compression enabled. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/EnableCompression\">enabling compression</a>.'
        },
        {
          'localisedRuleName': 'Leverage browser caching',
          'ruleImpact': 4.485565476190477,
          'summary': 'Setting an expiry date or a maximum age in the HTTP headers for static
            resources instructs the browser to load previously downloaded resources from local
            disk rather than over the network.',
          'urlBlocks': [
            {
              'header': '<a href=\"https://developers.google.com/speed/docs/insights/LeverageBrowserCaching\">Leverage browser caching</a> for the following cacheable resources:',
              'urlsToFix': [
                'http://tag.bounceexchange.com/1406/i.js (60 seconds)',
                'http://d3cxv97fi8q177.cloudfront.net/foundation-A35053-1a4e-4aac-bf5e-08a4b85602231.js (5 minutes)',
                'http://d3cxv97fi8q177.cloudfront.net/foundation-tags-SD3-3ed6-412c-8abc-bf8415e204121.js (5 minutes)',
                'http://d3cxv97fi8q177.cloudfront.net/mediasource-A35053-1a4e-4aac-bf5e-08a4b85602231.js (5 minutes)',
                'http://www.googletagmanager.com/gtm.js?id=GTM-PFWDHP&l=dataLayer (15 minutes)',
                'https://connect.facebook.net/en_US/fbevents.js (20 minutes)',
                'http://js-agent.newrelic.com/nr-974.min.js (60 minutes)',
                'https://mc.yandex.ru/metrika/watch.js (60 minutes)',
                'http://www.google-analytics.com/analytics.js (2 hours)'
              ]
            }
          ]
        },
        {
          'localisedRuleName': 'Reduce server response time',
          'ruleImpact': 0,
          'summary': 'Your server responded quickly. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/Server\">server response time optimization</a>.'
        },
        {
          'localisedRuleName': 'Minify CSS',
          'ruleImpact': 0,
          'summary': 'Your CSS is minified. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/MinifyResources\">minifying CSS</a>.'
        },
        {
          'localisedRuleName': 'Minify HTML',
          'ruleImpact': 0,
          'summary': 'Your HTML is minified. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/MinifyResources\">minifying HTML</a>.'
        },
        {
          'localisedRuleName': 'Minify JavaScript',
          'ruleImpact': 0,
          'summary': 'Your JavaScript content is minified. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/MinifyResources\">minifying JavaScript</a>.'
        },
        {
          'localisedRuleName': 'Eliminate render-blocking JavaScript and
            CSS in above-the-fold content',
          'ruleImpact': 12,
          'summary': 'Your page has 5 blocking script resources and 4 blocking CSS resources.
           This causes a delay in rendering your page.',
          'urlBlocks': [
            {
              'header': 'None of the above-the-fold content on your page could be rendered without waiting for the following resources to load. Try to defer or asynchronously load blocking resources, or inline the critical portions of those resources directly in the HTML.',
              'urlsToFix': []
            },
            {
              'header': '<a href=\"https://developers.google.com/speed/docs/insights/BlockingJS\">Remove render-blocking JavaScript</a>:',
              'urlsToFix': [
                'http://www2.shutterstock.com/base/public/js/common-head-3bd0063ac8.js',
                'http://www2.shutterstock.com/base/public/js/vendors-7b23492cd8.js',
                'http://www2.shutterstock.com/base/public/js/app-3f677df8b2.js',
                'http://www2.shutterstock.com/base/public/js/initial-focus-1aca12f950.js',
                'http://www2.shutterstock.com/base/public/js/image-load-097b438a6f.js'
              ]
            },
            {
              'header': '<a href=\"https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery\">Optimize CSS Delivery</a> of the following:',
              'urlsToFix': [
                'http://www2.shutterstock.com/base/public/css/app-40d08c3363.css',
                'http://www2.shutterstock.com/base/public/css/tablet-157cfb6ad8.css',
                'http://www2.shutterstock.com/base/public/css/home-4087af8930.css',
                'http://www2.shutterstock.com/base/public/css/lazy-73a13673b4.css'
              ]
            }
          ]
        },
        {
          'localisedRuleName': 'Optimize images',
          'ruleImpact': 2.443,
          'summary': 'Properly formatting and compressing images can save many bytes of data.',
          'urlBlocks': [
            {
              'header': '<a href=\"https://developers.google.com/speed/docs/insights/OptimizeImages\">Optimize the following images</a> to reduce their size by 22.8KiB (16% reduction).',
              'urlsToFix': [
                'Compressing http://ak.picdn.net/assets/cms/817ebf1c7395bfbf9cf73233a334882593f75f38-blog_image.jpg could save 11.7KiB (12% reduction).',
                'Compressing http://ak.picdn.net/assets/cms/f87a2acad5057eeb51209064542358035f416452-img_icons_2x.jpg could save 3.3KiB (17% reduction).',
                'Compressing http://picdn.net/assets/base/error/logo-white-x2.png could save 2.3KiB (37% reduction).',
                'Compressing http://privacy-policy.truste.com/privacy-seal/seal?rid=e932cd1f-9988-40e9-a66f-d71c21cd57f5 could save 1.6KiB (52% reduction).',
                'Compressing http://ak.picdn.net/assets/cms/a79884ca4f79515ddd1638884e0ed79092782913-img_vectors_2x.jpg could save 1.2KiB (11% reduction).',
                'Compressing and resizing http://www2.shutterstock.com/base/public/images/home/icon_icons_2x-8581f1bb78.png could save 679B (40% reduction).',
                'Compressing and resizing http://www2.shutterstock.com/base/public/images/home/icon_editor_2x-7444c625ac.png could save 576B (59% reduction).',
                'Compressing and resizing http://www2.shutterstock.com/base/public/images/home/icon_reverse_img_search_2x-26a5077fd8.png could save 576B (42% reduction).',
                'Compressing and resizing http://www2.shutterstock.com/base/public/images/home/icon_music_2x-9f6a726d59.png could save 536B (41% reduction).',
                'Compressing and resizing http://www2.shutterstock.com/base/public/images/home/icon_vectors_2x-15db089662.png could save 517B (37% reduction).'
              ]
            }
          ]
        },
        {
          'localisedRuleName': 'Prioritize visible content',
          'ruleImpact': 0,
          'summary': 'You have the above-the-fold content properly prioritized. Learn more about <a href=\"https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent\">prioritizing visible content</a>.'
        }
      ]
    }
  }
// Usage
const dataAccess = require('dataAccess');
dataAccess.processRawData({
    'kind': 'pagespeedonline#result',
    'id': 'http://www.shutterstock.com/',
    'responseCode': 200,
    'title': 'Stock Photos, Royalty-Free Images and Vectors - Shutterstock',
    'ruleGroups': {
      'SPEED': {
        'score': 83
      }
    },
    'pageStats': {
      'numberResources': 89,
      'numberHosts': 36,
      'totalRequestBytes': '14604',
      'numberStaticResources': 63,
      'htmlResponseBytes': '70001',
      'cssResponseBytes': '175538',
      'imageResponseBytes': '1505533',
      'javascriptResponseBytes': '917789',
      'otherResponseBytes': '5004',
      'numberJsResources': 25,
      'numberCssResources': 4
    },
    'formattedResults': {
      'locale': 'en_US',
      'ruleResults': {
        'AvoidLandingPageRedirects': {
          'localizedRuleName': 'Avoid landing page redirects',
          'ruleImpact': 0,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Your page has no redirects. Learn more about {{BEGIN_LINK}}avoiding landing page redirects{{END_LINK}}.',
            'args': [
              {
                'type': 'HYPERLINK',
                'key': 'LINK',
                'value': 'https://developers.google.com/speed/docs/insights/AvoidRedirects'
              }
            ]
          }
        },
        'EnableGzipCompression': {
          'localizedRuleName': 'Enable compression',
          'ruleImpact': 0,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'You have compression enabled. Learn more about {{BEGIN_LINK}}enabling compression{{END_LINK}}.',
            'args': [
              {
                'type': 'HYPERLINK',
                'key': 'LINK',
                'value': 'https://developers.google.com/speed/docs/insights/EnableCompression'
              }
            ]
          }
        },
        'LeverageBrowserCaching': {
          'localizedRuleName': 'Leverage browser caching',
          'ruleImpact': 4.485565476190477,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network.'
          },
          'urlBlocks': [
            {
              'header': {
                'format': '{{BEGIN_LINK}}Leverage browser caching{{END_LINK}} for the following cacheable resources:',
                'args': [
                  {
                    'type': 'HYPERLINK',
                    'key': 'LINK',
                    'value': 'https://developers.google.com/speed/docs/insights/LeverageBrowserCaching'
                  }
                ]
              },
              'urls': [
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://tag.bounceexchange.com/1406/i.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '60 seconds'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://d3cxv97fi8q177.cloudfront.net/foundation-A35053-1a4e-4aac-bf5e-08a4b85602231.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '5 minutes'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://d3cxv97fi8q177.cloudfront.net/foundation-tags-SD3-3ed6-412c-8abc-bf8415e204121.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '5 minutes'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://d3cxv97fi8q177.cloudfront.net/mediasource-A35053-1a4e-4aac-bf5e-08a4b85602231.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '5 minutes'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www.googletagmanager.com/gtm.js?id=GTM-PFWDHP&l=dataLayer'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '15 minutes'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'https://connect.facebook.net/en_US/fbevents.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '20 minutes'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://js-agent.newrelic.com/nr-974.min.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '60 minutes'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'https://mc.yandex.ru/metrika/watch.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '60 minutes'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}} ({{LIFETIME}})',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www.google-analytics.com/analytics.js'
                      },
                      {
                        'type': 'DURATION',
                        'key': 'LIFETIME',
                        'value': '2 hours'
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        'MainResourceServerResponseTime': {
          'localizedRuleName': 'Reduce server response time',
          'ruleImpact': 0,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Your server responded quickly. Learn more about {{BEGIN_LINK}}server response time optimization{{END_LINK}}.',
            'args': [
              {
                'type': 'HYPERLINK',
                'key': 'LINK',
                'value': 'https://developers.google.com/speed/docs/insights/Server'
              }
            ]
          }
        },
        'MinifyCss': {
          'localizedRuleName': 'Minify CSS',
          'ruleImpact': 0,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Your CSS is minified. Learn more about {{BEGIN_LINK}}minifying CSS{{END_LINK}}.',
            'args': [
              {
                'type': 'HYPERLINK',
                'key': 'LINK',
                'value': 'https://developers.google.com/speed/docs/insights/MinifyResources'
              }
            ]
          }
        },
        'MinifyHTML': {
          'localizedRuleName': 'Minify HTML',
          'ruleImpact': 0,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Your HTML is minified. Learn more about {{BEGIN_LINK}}minifying HTML{{END_LINK}}.',
            'args': [
              {
                'type': 'HYPERLINK',
                'key': 'LINK',
                'value': 'https://developers.google.com/speed/docs/insights/MinifyResources'
              }
            ]
          }
        },
        'MinifyJavaScript': {
          'localizedRuleName': 'Minify JavaScript',
          'ruleImpact': 0,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Your JavaScript content is minified. Learn more about {{BEGIN_LINK}}minifying JavaScript{{END_LINK}}.',
            'args': [
              {
                'type': 'HYPERLINK',
                'key': 'LINK',
                'value': 'https://developers.google.com/speed/docs/insights/MinifyResources'
              }
            ]
          }
        },
        'MinimizeRenderBlockingResources': {
          'localizedRuleName': 'Eliminate render-blocking JavaScript and CSS in above-the-fold content',
          'ruleImpact': 12,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Your page has {{NUM_SCRIPTS}} blocking script resources and {{NUM_CSS}} blocking CSS resources. This causes a delay in rendering your page.',
            'args': [
              {
                'type': 'INT_LITERAL',
                'key': 'NUM_SCRIPTS',
                'value': '5'
              },
              {
                'type': 'INT_LITERAL',
                'key': 'NUM_CSS',
                'value': '4'
              }
            ]
          },
          'urlBlocks': [
            {
              'header': {
                'format': 'None of the above-the-fold content on your page could be rendered without waiting for the following resources to load. Try to defer or asynchronously load blocking resources, or inline the critical portions of those resources directly in the HTML.'
              }
            },
            {
              'header': {
                'format': '{{BEGIN_LINK}}Remove render-blocking JavaScript{{END_LINK}}:',
                'args': [
                  {
                    'type': 'HYPERLINK',
                    'key': 'LINK',
                    'value': 'https://developers.google.com/speed/docs/insights/BlockingJS'
                  }
                ]
              },
              'urls': [
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/js/common-head-3bd0063ac8.js'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/js/vendors-7b23492cd8.js'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/js/app-3f677df8b2.js'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/js/initial-focus-1aca12f950.js'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/js/image-load-097b438a6f.js'
                      }
                    ]
                  }
                }
              ]
            },
            {
              'header': {
                'format': '{{BEGIN_LINK}}Optimize CSS Delivery{{END_LINK}} of the following:',
                'args': [
                  {
                    'type': 'HYPERLINK',
                    'key': 'LINK',
                    'value': 'https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery'
                  }
                ]
              },
              'urls': [
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/css/app-40d08c3363.css'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/css/tablet-157cfb6ad8.css'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/css/home-4087af8930.css'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': '{{URL}}',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/css/lazy-73a13673b4.css'
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        'OptimizeImages': {
          'localizedRuleName': 'Optimize images',
          'ruleImpact': 2.443,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'Properly formatting and compressing images can save many bytes of data.'
          },
          'urlBlocks': [
            {
              'header': {
                'format': '{{BEGIN_LINK}}Optimize the following images{{END_LINK}} to reduce their size by {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                'args': [
                  {
                    'type': 'HYPERLINK',
                    'key': 'LINK',
                    'value': 'https://developers.google.com/speed/docs/insights/OptimizeImages'
                  },
                  {
                    'type': 'BYTES',
                    'key': 'SIZE_IN_BYTES',
                    'value': '22.8KiB'
                  },
                  {
                    'type': 'PERCENTAGE',
                    'key': 'PERCENTAGE',
                    'value': '16%'
                  }
                ]
              },
              'urls': [
                {
                  'result': {
                    'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://ak.picdn.net/assets/cms/817ebf1c7395bfbf9cf73233a334882593f75f38-blog_image.jpg'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '11.7KiB'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '12%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://ak.picdn.net/assets/cms/f87a2acad5057eeb51209064542358035f416452-img_icons_2x.jpg'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '3.3KiB'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '17%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://picdn.net/assets/base/error/logo-white-x2.png'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '2.3KiB'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '37%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://privacy-policy.truste.com/privacy-seal/seal?rid=e932cd1f-9988-40e9-a66f-d71c21cd57f5'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '1.6KiB'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '52%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://ak.picdn.net/assets/cms/a79884ca4f79515ddd1638884e0ed79092782913-img_vectors_2x.jpg'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '1.2KiB'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '11%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing and resizing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/images/home/icon_icons_2x-8581f1bb78.png'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '679B'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '40%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing and resizing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/images/home/icon_editor_2x-7444c625ac.png'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '576B'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '59%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing and resizing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/images/home/icon_reverse_img_search_2x-26a5077fd8.png'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '576B'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '42%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing and resizing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/images/home/icon_music_2x-9f6a726d59.png'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '536B'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '41%'
                      }
                    ]
                  }
                },
                {
                  'result': {
                    'format': 'Compressing and resizing {{URL}} could save {{SIZE_IN_BYTES}} ({{PERCENTAGE}} reduction).',
                    'args': [
                      {
                        'type': 'URL',
                        'key': 'URL',
                        'value': 'http://www2.shutterstock.com/base/public/images/home/icon_vectors_2x-15db089662.png'
                      },
                      {
                        'type': 'BYTES',
                        'key': 'SIZE_IN_BYTES',
                        'value': '517B'
                      },
                      {
                        'type': 'PERCENTAGE',
                        'key': 'PERCENTAGE',
                        'value': '37%'
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        'PrioritizeVisibleContent': {
          'localizedRuleName': 'Prioritize visible content',
          'ruleImpact': 0,
          'groups': [
            'SPEED'
          ],
          'summary': {
            'format': 'You have the above-the-fold content properly prioritized. Learn more about {{BEGIN_LINK}}prioritizing visible content{{END_LINK}}.',
            'args': [
              {
                'type': 'HYPERLINK',
                'key': 'LINK',
                'value': 'https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent'
              }
            ]
          }
        }
      }
    },
    'version': {
      'major': 1,
      'minor': 15
    }
  });
```

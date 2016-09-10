## Modules

<dl>
<dt><a href="#module_dataFormatter">dataFormatter</a></dt>
<dd><p>Helper method that helps in formatting returned by Google API</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#buildSummary">buildSummary(opts)</a> ⇒ <code>string</code></dt>
<dd><p>Denormalizes summary information returned by Google API</p>
</dd>
<dt><a href="#buildRulesInfo">buildRulesInfo(opts)</a> ⇒ <code>Object</code> | <code>string</code> | <code>Array</code></dt>
<dd><p>Denormalizes url blocks returned by Google API</p>
</dd>
<dt><a href="#_mapObject">_mapObject(opts)</a> ⇒ <code>string</code></dt>
<dd><p>[Internal function] Replaces keys in opt.format with corresponding values from opts.args</p>
</dd>
</dl>

<a name="module_dataFormatter"></a>

## dataFormatter
Helper method that helps in formatting returned by Google API

<a name="buildSummary"></a>

## buildSummary(opts) ⇒ <code>string</code>
Denormalizes summary information returned by Google API

**Kind**: global function  
**Returns**: <code>string</code> - - Denormalized summary info string  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Object containing summary information |
| opts.format | <code>string</code> | Normalized summary string |
| opts.args | <code>Array</code> | Array containing information to denormalize above |

**Example**  
```js
// returns 'Your page has 5 blocking script resources and 4 blocking CSS resources'
// Usage
const dataFormatter = require('dataFormatter');
dataFormatter.buildSummary({
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
```
<a name="buildRulesInfo"></a>

## buildRulesInfo(opts) ⇒ <code>Object</code> &#124; <code>string</code> &#124; <code>Array</code>
Denormalizes url blocks returned by Google API

**Kind**: global function  
**Returns**: <code>Object</code> - formattedUrlBlocks - Object containing formatted url blocks<code>string</code> - formattedUrlBlocks[0].headers - String defining url block headers<code>Array</code> - formattedUrlBlocks[0].urls - Arrays containing Denormalized url strings  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Array</code> | Array containing url blocks |
| opts[0].headers | <code>Object</code> | Url block headers |
| opts[0].urls | <code>Array</code> | Array of url objects |

**Example**  
```js
// returns
[
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
// Usage
const dataFormatter = require('dataFormatter');
dataFormatter.buildUrlBlocks([
[
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
```
<a name="_mapObject"></a>

## _mapObject(opts) ⇒ <code>string</code>
[Internal function] Replaces keys in opt.format with corresponding values from opts.args

**Kind**: global function  
**Returns**: <code>string</code> - - Denormalized summary info string  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Object containing summary information |
| opts.format | <code>string</code> | Normalized summary string |
| opts.args | <code>Array</code> | Array containing information to denormalize above |


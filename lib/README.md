## Modules

<dl>
<dt><a href="#module_dataAccess">dataAccess</a></dt>
<dd><p>Module that obtains information from Google pagespeed API and formats it</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getRawData">getRawData(opts)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Makes call to Google&#39;s pagespeed API and fetches data for the url arrays</p>
</dd>
<dt><a href="#processRawData">processRawData(rawData)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Processes raw data and formats it to a more readable structure</p>
</dd>
</dl>

<a name="module_dataAccess"></a>

## dataAccess
Module that obtains information from Google pagespeed API and formats it

<a name="getRawData"></a>

## getRawData(opts) ⇒ <code>Promise.&lt;Object&gt;</code>
Makes call to Google's pagespeed API and fetches data for the url arrays

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - Promise to raw data from pagespeed  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Object containing url |
| opts.url | <code>string</code> | url to fetch pagespeed for |

<a name="processRawData"></a>

## processRawData(rawData) ⇒ <code>Promise.&lt;Object&gt;</code>
Processes raw data and formats it to a more readable structure

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - Promise to processed data from pagespeed  

| Param | Type | Description |
| --- | --- | --- |
| rawData | <code>Object</code> | JSON formatted rawData @see [getRawData](#getRawData) |


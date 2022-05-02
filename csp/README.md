# CSP Demos

## Content

### SOP (Same Origin Policy) - Deprecated

SOP

* The default strategy is SOP
* The "Access-Control-Allow-Origin" header from the API server will not block the request
* The "Content-Security-Policy" header or meta from the Web server will block the request

### CORS (Cross Origin Resource Sharing)

CORS for sample request

* If the "Content-Security-Policy" header does not exist, request directly
* The "Access-Control-Allow-Origin" header will determine whether the server should retrun
* If the "Content-Security-Policy" header exist, check the header before request
* If the "Content-Security-Policy" header exist both in header and meta, both take effect
* If the client could get the repsonse and the server sent the "Access-Control-Allow-Origin" header, which does not allow the corresponding client, it will hide the result. (In fact, the server can determine the result with the user agent of the client)

CORS for non-sample request

* Preflight request to ask the server: origin, method, headers, cache durarion, etc
* Preflight fails, the real will fail automatically
* The "Access-Control-Max-Age" header

CSP Report

* The "Content-Security-Policy-Report-Only" header does not block the request, it only report the request to the report server if it does not follow the policy

## Reference

### CORS

Cross-Origin Resource Sharing

* [Cross-Origin Resource Sharing](https://www.w3.org/TR/2020/SPSD-cors-20200602/)
* [Mozilla: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

What are simple requests?

* [Simple Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests)

How does access control allow origin header work?

* [How does access control allow origin header work?](https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work)
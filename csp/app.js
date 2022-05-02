//
const express = require("express");
const bodyParser = require("body-parser");



// Web Server (8080)
let webExpress = express();
webExpress.use('/', express.static('static', {
    index: "index.htm",
    setHeaders: function (res, path, stat) {
        //res.set("Content-Security-Policy", "connect-src localhost:8081");
        //res.set("Content-Security-Policy-Report-Only", "connect-src localhost:9999; report-uri http://localhost:8088/report");
        // Disable the cache
        res.set('Cache-Control', 'no-store');
    }
}));
webExpress.get("/sop", (req,  resp) => {
    console.log("GET: /sop");
    // This will not block the request from the same origin
    resp.set("Access-Control-Allow-Origin", 'none');
    resp.send("OK. GET:/sop");
});

webExpress.listen(8080, function() {
    console.log("Web server is OK: 8080");
});



// API Server (8081)
// Parse the csp report
let apiExpress = express();

// CORS
apiExpress.options("/cors", (req,  resp) => {
    console.log("OPTIONS: /cors");
    
    let headers = req.headers;
    for (var key in headers) {
        console.log(key + ": " + headers[key]);
    }

    //resp.set("Access-Control-Allow-Origin", "null");
    resp.set("Access-Control-Allow-Origin", "*");
    resp.set("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT");
    resp.set("Access-Control-Allow-Headers", "X-My-Header");
    resp.set("Access-Control-Max-Age", "0");

    resp.status(204);
    resp.end();
});
apiExpress.get("/cors", (req,  resp) => {
    console.log("GET: /cors");
    
    //resp.set("Access-Control-Allow-Origin", "null");
    resp.set("Access-Control-Allow-Origin", "http://localhost:8080");
    
    resp.send("OK. GET:/cors");
});
apiExpress.put("/cors", (req,  resp) => {
    console.log("PUT: /cors");
    
    resp.set("Access-Control-Allow-Origin", "http://localhost:8080");
    
    resp.send("OK. PUT:/cors");
});

// CORS - Block
apiExpress.options("/cors/block", (req,  resp) => {
    console.log("GET: /cors/cache");
    // This will block all the requests
    resp.set("Access-Control-Allow-Origin", "null");
    
    resp.status(204);
    resp.end();
});
apiExpress.get("/cors/block", (req,  resp) => {
    console.log("PUT: /cors/block");
    resp.set("Access-Control-Allow-Origin", "null");
    resp.send("OK. PUT:/cors/block");
});
apiExpress.put("/cors/block", (req,  resp) => {
    console.log("PUT: /cors/block");
    resp.set("Access-Control-Allow-Origin", "*");
    resp.send("OK. PUT:/cors/block");
});

// CORS - Cache
apiExpress.options("/cors/cache", (req,  resp) => {
    console.log("OPTIONS: /cors/cache");
    resp.set("Access-Control-Allow-Origin", "*");
    resp.set("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT");
    resp.set("Access-Control-Allow-Headers", "X-My-Header");
    resp.set("Access-Control-Max-Age", "60");
    resp.status(204);
    resp.end();
});
apiExpress.put("/cors/cache", (req,  resp) => {
    console.log("PUT: /cors/cache");
    resp.set("Access-Control-Allow-Origin", "*");
    resp.send("OK. PUT:/cors/cache");
});


apiExpress.listen(8081, function() {
    console.log("API server is OK: 8081")
});



// CSP Report Server (8088)
// Parse the csp report
let cspExpress = express();
cspExpress.use(bodyParser.json({type: 'application/json'}));
cspExpress.use(bodyParser.json({type: 'application/csp-report'}));

cspExpress.post("/report", (req,  resp) => {
    let now = new Date();
    let time = now.getFullYear()
        + "-" + ("0" +(now.getMonth() + 1)).slice(-2) 
        + "-" + ("0" + now.getDate()).slice(-2) + " "
        + ("0" + now.getHours()).slice(-2) 
        + ":" + ("0" + now.getMinutes()).slice(-2)
        + ":" + ("0" + now.getSeconds()).slice(-2);

    console.log("#####CSP Report(" + time + ")#####");
    console.log(req.body);
    resp.send("OK. From CSP report server.");
});

cspExpress.listen(8088, function() {
    console.log("CSP server is OK: 8088")
});
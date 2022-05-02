//
const express = require("express");
const bodyParser = require("body-parser");



// Web Server (8080)
let webExpress = express();
webExpress.use('/static', express.static('static', {
    setHeaders: function (res, path, stat) {
        //res.set("Content-Security-Policy", "connect-src localhost");
        res.set("Content-Security-Policy-Report-Only", "connect-src localhost; report-uri http://localhost:8088/report");
    }
}));
webExpress.get("/same-origin", (req,  resp) => {
    console.log("GET: /same-origin");
    // This will not block the request from the same origin
    resp.set("Access-Control-Allow-Origin", 'none');
    resp.send("OK. From the same origin.");
});

webExpress.listen(8080, function() {
    console.log("Server is OK: 8080");
});



// API Server (8081)
// Parse the csp report
let apiExpress = express();

// Allow only one origin
apiExpress.get("/allow-one", (req,  resp) => {
    console.log("GET: /allow-one");
    resp.set("Access-Control-Allow-Origin", "http://localhost:8080");
    resp.send("Hello, express, Allow one");
});
apiExpress.put("/allow-one", (req,  resp) => {
    console.log("PUT: /allow-one");
    resp.set("Access-Control-Allow-Origin", "http://localhost:8080");
    resp.send("Hello, express, Allow one");
});
apiExpress.options("/allow-one", (req,  resp) => {
    console.log("OPTIONS: /allow-one");
    
    let headers = req.headers;
    for (var key in headers) {
        console.log(key + ": " + headers[key]);
    }

    resp.set("Access-Control-Allow-Origin", "http://localhost:8080");
    resp.set("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT");
    resp.set("Access-Control-Allow-Headers", "X-My-Header");
    resp.set("Access-Control-Max-Age", "3600");
    resp.send("Hello, express, Allow one");
});

// Allow all origins
apiExpress.get("/allow-all", (req,  resp) => {
    console.log("GET: /allow-all");
    resp.set("Access-Control-Allow-Origin", "*");
    resp.send("Hello, express, Allow all");
});

// Allow all no origins
apiExpress.get("/allow-none", (req,  resp) => {
    console.log("GET: /allow-none");
    resp.set("Access-Control-Allow-Origin", "null");
    resp.send("Hello, express, Allow none");
});

// Allow all origins, but denied after options
apiExpress.put("/allow-fake", (req,  resp) => {
    console.log("PUT: /allow-fake");
    resp.set("Access-Control-Allow-Origin", "*");
    resp.send("OK. (allow-fake)");
});
apiExpress.options("/allow-fake", (req,  resp) => {
    console.log("GET: /allow-fake");
    resp.set("Access-Control-Allow-Origin", "null");
    resp.status(200);
    resp.end();
});

apiExpress.listen(8081, function() {
    console.log("Server is OK: 8081")
});



// CSP Report Server (8088)
// Parse the csp report
let cspExpress = express();
cspExpress.use(bodyParser.json({type: 'application/json'}));
cspExpress.use(bodyParser.json({type: 'application/csp-report'}));

cspExpress.post("/report", (req,  resp) => {
    let time = new Date().toLocaleString();
    console.log("#####Content from CSP report(" + time + ")#####");
    console.log(req.body);
    resp.send("OK. From CSP report server.");
});

cspExpress.listen(8088, function() {
    console.log("Server is OK: 8088")
});
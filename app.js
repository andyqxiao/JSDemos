const express = require("express");
const bodyParser = require("body-parser");

let webExpress = express();
let apiExpress = express();

// Web
webExpress.use('/', express.static('static', {
    setHeaders: function (res, path, stat) {
        //res.set("Content-Security-Policy", "connect-src localhost:7777");
        res.set("Content-Security-Policy-Report-Only", "connect-src localhost:8888; report-uri http://localhost:7777/report");
    }
}));

webExpress.listen(8888);



// API
// Parse the csp report
apiExpress.use(bodyParser.json({type: 'application/json'}));
apiExpress.use(bodyParser.json({type: 'application/csp-report'}));

apiExpress.get("/allowOne", (req,  resp) => {
    resp.set("Access-Control-Allow-Origin", "http://localhost:8888");
    resp.send("Hello, express, Allow one");
});
apiExpress.get("/allowAll", (req,  resp) => {
    resp.set("Access-Control-Allow-Origin", "*");
    resp.send("Hello, express, Allow all");
});
apiExpress.get("/AllowNone", (req,  resp) => {
    resp.send("Hello, express, Allow none");
});

apiExpress.post("/report", (req,  resp) => {
    console.log(req.body);
    resp.send("OK");
});

apiExpress.listen(7777);
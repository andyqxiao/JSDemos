//
const express = require("express");
const bodyParser = require("body-parser");

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
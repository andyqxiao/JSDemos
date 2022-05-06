//
const express = require("express");

let webExpress = express();
webExpress.use('/', express.static('static', {
    index: "index.htm",
    setHeaders: function (res, path, stat) {
        res.set('Cache-Control', 'no-store');
        res.set("Content-Security-Policy-Report-Only", "connect-src none; report-uri http://localhost:8088/report");
    }
}));

webExpress.listen(8080, function() {
    console.log("Web server is OK: 8080");
});
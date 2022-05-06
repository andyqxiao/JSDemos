//
const express = require("express");

function startServer(port) {
    let apiExpress = express();
    apiExpress.get("/api", (req,  resp) => {
        console.log("GET: " + port + "/api");
        resp.set("Access-Control-Allow-Origin", "*");
        resp.send("OK. GET:" + port + "/api");
    });
    apiExpress.listen(port, function() {
        console.log("API server is OK: " + port)
    });
}

for (var port =  8081; port < 8088; port++) {
    startServer(port);
}
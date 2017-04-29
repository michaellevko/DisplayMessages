// server.js

// modules =================================================
var express = require('express');
var app = express();

// set static files location
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.sendFile(__dirname + "/public/index.html");
}).listen(8080);
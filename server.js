// server.js

// modules =================================================
var express     = require('express');
var path        = require('path');

// run server ==============================================
var app = express();

// configure ===============================================
app.use(express.static(path.join(__dirname, 'public')));

// set static files location
// app.use(express.static('public'));


app.get('/screen=:id', function (request, response) {
    var screenId = request.params.id;

    response.sendFile(path.join(__dirname, "/public/templates/template_" + screenId + ".html"));
});

/*
 * default route for DisplayMessages app
 * returns index.html with default message
 */
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, "/public/index.html"));
});

// fire up the engines ! ==================================
app.listen(8080);

/*
 *
 */
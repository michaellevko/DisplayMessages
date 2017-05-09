// app.js

// modules =================================================
var mongo   = require('./mongo.js');
var express = require('express');
var path    = require('path');
var fs      = require('fs');
var pug     = require('pug');
var app     = express();

// configure ===============================================
app.set('views', 'public/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

// routes ==================================================
/*
 * handles ajax requests
 * returns messages array by given screen id
 */
app.get("/update/:screenId", function(request,response){
    var screenId = parseInt(request.params.screenId, 10);
    mongo.getMsgByScreenId(screenId, function (err, docs) {
        if (!err) {
            response.send(docs);
        }
        else {
            console.log('Database Error: ' + err);
            response.send([]);
        }
    });
});

/*
 * handles browser request
 * returns default html and sets h1 to screen-id
 */
app.get('/screen=:id', function (request, response) {
    var screenId = request.params.id;
    response.render('screen', { title: 'Screen-' + screenId })
});

/*
 * default route for DisplayMessages app
 * returns layout.pug template with default message
 */
app.get('/', function (request, response) {
    response.render('index', { title: 'Default Route' })
});

// fire up the engines ! ==================================
app.listen(8080);
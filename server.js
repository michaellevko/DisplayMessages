// server.js

// modules =================================================
var express         = require('express');
var path            = require('path');
var fs              = require('fs');
var pug             = require('pug');
var app             = express();

// configure ===============================================
app.set('views', 'public/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

// messages json file ======================================
var messagesFile = './messages.json';

// routes ==================================================
/*
 * handles ajax requests
 * returns messages array by given screen id
 */
app.get("/update/:screenId", function(request,response){
    var screenId = parseInt(request.params.screenId, 10);
    var filteredMessages = [];

    // reading messages json on each client request to reflect
    // changes made to messages, as instructed on task 2 section 4
    var messagesJson = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    for(msg in messagesJson.messages){
        if (messagesJson.messages[msg].hasOwnProperty('screenIds')) {
            if (messagesJson.messages[msg].screenIds.indexOf(screenId) > -1) {
                filteredMessages.push(messagesJson.messages[msg]);
            }
        }
    }
    response.send(filteredMessages);
});

/*
 * handles browser request
 * returns default html and sets h1 to screen-id
 */
app.get('/screen=:id', function (request, response) {
    var screenId = request.params.id;
    response.render('index', { identifier: 'Screen-' + screenId })
});

/*
 * default route for DisplayMessages app
 * returns index.pug template with default message
 */
app.get('/', function (request, response) {
    response.render('index', { identifier: 'Default Route' })
});

// fire up the engines ! ==================================
app.listen(8080);
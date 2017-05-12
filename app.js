// app.js

// modules =================================================
var mongo   = require('./mongo.js');
var express = require('express');
var app     = express();
var path    = require('path');
var fs      = require('fs');
var pug     = require('pug');
var socket  = require('socket.io');
var server  = require('http').Server(app);

// configure ===============================================
app.set('views', 'public/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

// variables ===============================================
var clients = {};
// reads json from filePath and parse, then returns to callback
function readJSON(filePath, callback) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        var parsedJson;

        // Handle Error
        if (err) {
            return callback(err);
        }

        // parse JSON
        try {
            parsedJson = JSON.parse(data);
        } catch (exception) {
            return callback(exception);
        }

        // everything is ok
        return callback(null, parsedJson);
    });
}

// websockets ==============================================
io = socket.listen(server);
io.sockets.on('connection', function (client) {
    client.on('init', function (screenId) {
        // add new client to associative array and save screenId
        // of client on the socket
        clients[screenId] = client.id;
        client.screenId = screenId;
        // get all messages of screenId from mongo db
        mongo.getMsgByScreenId(screenId, function (err, docs) {
            if (!err) {
                client.emit('init', docs);
            }
            else {
                console.log('Database Error: ' + err);
                client.emit('init', []);
            }
        });
    });
    client.on('disconnect', function () {
        // remove client from clients associative array
        delete clients[client.screenId];
    });
});

// routes ==================================================
/*
 * Test route for Task-4
 * 1) reads newMessage.json containing new message
 * 2) inserts newMessage to mongo DB
 * 3) emits new Message to client by request.query.id
 * 4) renders /TestUpdate with message with status
 */
app.get('/TestUpdate', function (request, response) {
   var screenId = parseInt(request.query.id);
    // edit msg json screenIds with screenId;
    readJSON('newMessage.json', function (err, msg) {
        if (err) {
            console.log('Error reading json: ' + err);
        }
        else {
            if (msg.screenIds.indexOf(screenId) == -1) {
                msg.screenIds.push(screenId);
            }
            // add msg to msgCollection in mongo
            mongo.addMsgToCollection(msg, function (err, status) {
                // if success then emit new msg to client
                // and render success message to html
                if (!err) {
                    if (!io.sockets.connected[clients[screenId]]) {
                        io.sockets.connected[clients[screenId]]
                            .emit('addMsg', msg);
                        response.render('testUpdateResponse',
                            {updateStatus: 'New Message ' + status});
                    }
                    else {
                        console.log('No connected client with screenId:' +
                            ' ' + screenId);
                        response.render('testUpdateResponse',
                            {updateStatus: 'New Message ' + status + '. ' +
                                'However, no connected client with ' +
                                'screenId: ' + screenId});
                    }
                }
                // if failure then render failure message to html
                else {
                    console.log('Database Error: ' + err);
                    response.render('testUpdateResponse',
                        {updateStatus: 'New Message Failed to Updated'});
                }
            })
        }
    })
});

/*
 * handles ajax requests
 * returns messages array by given screen id
 */
app.get('/update/:screenId', function(request,response){
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
server.listen(8080);
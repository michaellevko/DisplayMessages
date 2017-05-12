/*
 * Websockets.js
 * Socket.IO listeners for client
 */

var server = io.connect('http://localhost:8080');

/*
 * Socket.io listeners
 */
server.on('init', function (data) {
    messages = data;
    refreshDisplay();
});
server.on('addMsg', function (data) {
    messages.push(data);
    if (messages.length > 10) {
        messages.shift();
    }
});
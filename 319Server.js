var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('log.txt', {flags: 'w'});
var log_stdout = process.stdout;
console.log = function(d) {
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(8002, function() {
	console.log((new Date()) + " Server is listening on port " + 8001);
});

// create the server
var wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
   console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
   var connection = request.accept(null, request.origin);
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
	    //connection.sendUTF(JSON.stringify({confidenceLevel: 0.1234}))
	    connection.sendUTF("FAIL")
    }});

    connection.on('close', function(connection) {
        // close user connection
    });
});

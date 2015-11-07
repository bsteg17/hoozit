// Create a new Express application
var express = require('express'),
http = require('http');
app = express();
server = http.createServer(app).listen(8080);
app.use(express.static('public'));

/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require("util"),					// Utility resources (logging, object inspection, etc)
	io = require("socket.io");		// Socket.IO	// Player class


/**************************************************
** GAME VARIABLES
**************************************************/
var socket;		// Socket controller


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {

	// Set up Socket.IO to listen on port 8080
	socket = io.listen(server);

	// Only use WebSockets
	socket.set("transports", ["websocket"]);
	// Restrict log output
	socket.set("log level", 2);

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Socket.IO
	socket.sockets.on("connection", function() {console.log("hi");});
};

// New socket connection
function onSocketConnection(client) {
	console.log("New user: "+client.id);
}

/**************************************************
** RUN THE GAME
**************************************************/
init();
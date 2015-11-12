// Create a new Express application
var express = require('express'),
http = require('http');
app = express();
server = http.createServer(app).listen(8000);
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

	// Start listening for events
	socket.sockets.on("connection", onSocketConnection);
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Socket.IO
	socket.sockets.on("message", incomingMessage);
	socket.sockets.on("echo", function() {console.log("Hello world")});
};

// New socket connection
function onSocketConnection(client) {
	console.log("New user: "+client.id);
	setEventHandlers();
	/*
	console.log("New user: "+client.id);
	socket.emit("echo", {text:"hello world"});
	*/
}

function incomingMessage(message) {
	console.log("New message: \n");
	console.log(message.sender);
	console.log("\n");
	console.log(message.text);
}

/**************************************************
** RUN THE GAME
**************************************************/
init();
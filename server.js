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
var users = [];

/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {

	// Set up Socket.IO to listen on port 8080
	socket = io.listen(server);

	// Only use WebSockets
	socket.set("transports", ["websocket"]);

	// Start listening for events
	socket.sockets.on("connection", function onSocketConnection (client) {

		users.push(client.id);
		console.log("New user: "+client.id);

		//once enough users are in the chatroom, enable chatting
		if (users.length === 2) {
			client.emit("chatReady");
			client.broadcast.emit("chatReady");
			//keep further clients from connecting
		}

		setEventHandlers(client);
	});
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/

var setEventHandlers = function(client) {
	// Socket.IO
	client.on("message", messageHandler);
};

function messageHandler(message) {
	for (i = 0; i < users.length; i++) {
		if (users[i] != message.sender) {
			socket.to(users[i]).emit('incomingMessage', message);
		}
	}
}

/**************************************************
** RUN THE GAME
**************************************************/
init();

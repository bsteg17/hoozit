var http = require('http'),
	express = require('express'),
	url = require('url');

const PORT=8080; 
const CLIENT_ID = '40e3aa0f3dfd4cf9ba6c4034c0697f55';
const GAME_URI = "http://localhost:8080/game";

var app = express();
var code;

var server = http.createServer(app).listen(PORT);

app.get('/', function (request, response) {
	response.redirect('https://api.instagram.com/oauth/authorize/?client_id='+CLIENT_ID+'&redirect_uri=http://localhost:8080/game&response_type=code');
});

app.get('/game', function (request, response) {
	if (request.hasOwnProperty('error')) {
		response.send("GOOFED");
		return;
	}
	response.send(request.code);
});
var http = require('http'),
	express = require('express'),
	url = require('url'),
	request = require('request');

const PORT=8080; 
const CLIENT_ID = '40e3aa0f3dfd4cf9ba6c4034c0697f55';
const CLIENT_SECRET = '371d5fdcbfbb4cca9b956547197230db';
const GAME_URI = "http://localhost:8080/game";

var app = express();
var code;

var server = http.createServer(app).listen(PORT);

app.get('/', function (request, response) {
	response.redirect('https://api.instagram.com/oauth/authorize/?client_id='+CLIENT_ID+'&redirect_uri=http://localhost:8080/game&response_type=code');
});

app.get('/game', function (req, res) {
	
	//Get code to exchange for token
	code = req.url.split('=')[1];

	//POST request for token
	
	request.post(
		'https://api.instagram.com/oauth/access_token',
		{ form: { client_id:CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: "authorization_code",
			redirect_uri: GAME_URI,
			code: code }
		},
		 function (err, resp, body) {
		
			console.log(body);
		
		 }
	);
	
	res.end();
});

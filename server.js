var http = require('http'),
	express = require('express'),
	url = require('url'),
	request = require('request');

const PORT=8080; 
const CLIENT_ID = '40e3aa0f3dfd4cf9ba6c4034c0697f55';
const GRANT_TYPE = 'authorization_code';
const CLIENT_SECRET = '371d5fdcbfbb4cca9b956547197230db';
const GAME_URI = "http://localhost:8080/game";

var app = express();
var code;

var server = http.createServer(app).listen(PORT);

app.get('/', function (request, response) {
	response.redirect('https://api.instagram.com/oauth/authorize/?client_id='+CLIENT_ID+'&redirect_uri=http://localhost:8080/game&response_type=code');
});

app.get('/game', function (request, response) {

	code = request.url.split('=')[1];

    /*
	path = //"/oauth/access_token?"
			"client_id="+CLIENT_ID
			+"&client_secret="+CLIENT_SECRET
			+"&grant_type="+GRANT_TYPE
			+"&redirect_url="+GAME_URI
			+"&code="+code;

	path = {client_id:CLIENT_ID,
			client_secret:CLIENT_SECRET,
			grant_type:GRANT_TYPE,
			redirect_url:GAME_URI,
			code:code};
	*/

	request({
    	url: 'api.instagram.com/oauth/access_token', //URL to hit
    	qs: {from: 'blog example', time: +new Date()}, //Query string data
    	method: 'POST',
    	//Lets post the following key/values as form
    	form: {client_id:CLIENT_ID,
			client_secret:CLIENT_SECRET,
			grant_type:GRANT_TYPE,
			redirect_url:GAME_URI,
			code:code}
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	    }
	});
});
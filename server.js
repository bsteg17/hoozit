var http = require('http'),
	express = require('express'),
	url = require('url'),
	request = require('request'),
	curl = require('curlrequest');

const PORT=8080; 
const CLIENT_ID = '40e3aa0f3dfd4cf9ba6c4034c0697f55';
const GRANT_TYPE = 'authorization_code';
const CLIENT_SECRET = '371d5fdcbfbb4cca9b956547197230db';
const GAME_URI = "http://localhost:8080/game";

var app = express();
var code;

var server = http.createServer(app).listen(PORT);
var user_info;

app.get('/', function (req, res) {
	res.redirect('https://api.instagram.com/oauth/authorize/?client_id='+CLIENT_ID+'&redirect_uri=http://localhost:8080/game&response_type=code');
});

app.get('/game', function (req, res) {
	
	//Get code to exchange for token
	code = req.url.split('=')[1];

	//POST request for token
	var user_info;
	request.post(
		'https://api.instagram.com/oauth/access_token',
		{ form: { client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: "authorization_code",
			redirect_uri: GAME_URI,
			code: code }
		},
		 function (err, resp, body) {
		 	if (err) {
		 		//console.log(err);
		 	} else {
			user_info = JSON.parse(body);
			res.send(user_info);
		}
		}
	);
});

var insta_call = function (user_info, endpoint) {

	curl.request('https://api.instagram.com/v1/users/'+user_info['user']['id']+'/'+endpoint+'?access_token='+user_info['access_token'], function (err, resp) {
		
		resp = JSON.parse(resp);
		if (resp['meta']['code'] == 200) {
			return resp;
		} else {
			console.log("Couldn't make connection with Instagram.");
		}
	});

	/*
	console.log(user_info);
	console.log(user_info['user']['id']);
	console.log(user_info['access_token']);
	
	options = {
		host: 'www.instagram.com',
		path: '/v1/users/self/follows?access_token='+user_info['access_token'],
		//path: 'v1/tags/nofilter/media/recent?client_id='+CLIENT_ID
		encoding: null
	};

	var full_data;
	http.get(options, function (resp) {

		//console.log(resp);

		resp.on('data', function (data) {
			console.log(data.statusCode);
			full_data += data.read();
		});
		resp.on('end', function() {
			var parsed = JSON.parse(full_data);
			console.log(parsed);
		});
		
	});*/
}

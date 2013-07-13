/* 

~~ Drizzle Frizzle ~~

*/

//////////////////
// Dependencies //
//////////////////

// NodeJS Utilities
var	https = require('https'),
	http = require("http"),
	url = require('url'),
	path = require('path'),
	crypto = require('crypto'),

// Environment
	env = 'development',
	port = 3001,
	config = require('./config/config')(path, port)[env],

// Express
	express = require('express'),
	app = express(),
	server = http.createServer(app),

// SocketIO	
	io = require('socket.io').listen(server);


///////////////////
// Configuration //
///////////////////

// Express Settings
require('./config/express')(app, express, config);

// Routing
require('./config/routes')(app);


///////////////
// Socket IO //
///////////////

io.sockets.on('connection', function(socket) {
  	console.log('Socket Connected!');

  	socket.on('test', function(data) {
  		console.log(data);
  	});
  	
  	socket.on('drawClick', function(data) {
    	console.log(data);

    	/* socket.broadcast.emit('draw', {
      		x: data.x,
      		y: data.y,
      		type: data.type
    	}); */
  	});
});

var OpenTok = require('opentok');
var apiKey = '25925352';    // Replace with your API key  
var secret = 'b10360ef840cd6659cd5d14d184f629926b55d30';  // Replace with your API secret  
var opentok = new OpenTok.OpenTokSDK(apiKey, secret);

var location = '127.0.0.1'; // use an IP of 'localhost'



var url_parts = url.parse(request.url, true);
var query = url_parts.query;
if (typeof query.sessionId  === "undefined" ){
	var sessionId = '';
	opentok.createSession(location, {'p2p.preference':'disabled'}, function(result){
 		sessionId = result;
	});
}
else
	var sessionId = query.sessionId;

var token = opentok.generateToken({session_id:sessionId, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});


//////////////////
// Start Server //
//////////////////

server.listen(port, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, env);
});
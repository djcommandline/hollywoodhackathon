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
	io = require('socket.io').listen(server),

// Request
	request = require('request'),

// OpenTok
	OpenTok = require('opentok');


///////////////////
// Configuration //
///////////////////

// Express Settings
require('./config/express')(app, express, config);

// Routing
require('./config/routes')(app, config, OpenTok);


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

    	socket.broadcast.emit('draw', {
      		x: data.x,
      		y: data.y,
      		type: data.type
    	});
  	});
});


//////////////////
// Start Server //
//////////////////

server.listen(port, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, env);
});
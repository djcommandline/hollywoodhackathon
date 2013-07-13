var OpenTok = require('opentok');
var apiKey = '35091912';    // Replace with your API key  
var secret = '9b11b88535654603e8b21ca350ca60d5c165f029';  // Replace with your API secret  
var opentok = new OpenTok.OpenTokSDK(apiKey, secret);

var location = '127.0.0.1'; // use an IP of 'localhost'


var url = require('url');
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

var token = opentok.generateToken({session_id:session_id, role:OpenTok.RoleConstants.PUBLISHER, connection_data:""});

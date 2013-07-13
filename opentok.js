var OpenTok = require('opentok');
var key = '35091912';    // Replace with your API key  
var secret = '9b11b88535654603e8b21ca350ca60d5c165f029';  // Replace with your API secret  
var opentok = new OpenTok.OpenTokSDK(key, secret);

var location = '127.0.0.1'; // use an IP of 'localhost'
var sessionId = '';
opentok.createSession(location, {'p2p.preference':'enabled'}, function(result){
  sessionId = result;
});

var token = opentok.generateToken({session_id:session_id, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});

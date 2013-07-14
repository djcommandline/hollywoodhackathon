////////////
// Routes //
////////////

module.exports = function (app, config, OpenTok) {

	app.get('/', function (req, res) {	
		var apiKey = '25925352';    // Replace with your API key  
		var secret = 'b10360ef840cd6659cd5d14d184f629926b55d30';  // Replace with your API secret  

		var sessionId = '';
		var opentok = new OpenTok.OpenTokSDK(apiKey, secret);

		opentok.createSession(config.root, {'p2p.preference':'disabled'}, function (result) {
	 		var data = {};

	 		data.apiKey = apiKey;
	 		data.sessionId = result;
	 		data.token = opentok.generateToken({session_id:sessionId, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});

	 		res.render('index', { data : data });

		});
	});

	app.get('/:sessionId', function (req, res) {
		var apiKey = '25925352';    // Replace with your API key  
		var secret = 'b10360ef840cd6659cd5d14d184f629926b55d30';  // Replace with your API secret  
		var opentok = new OpenTok.OpenTokSDK(apiKey, secret);

		var data = {};

		data.apiKey = apiKey;
		data.sessionId = req.params.sessionId;
		data.token = opentok.generateToken({session_id:data.sessionId, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});

		res.render('index', { data : data });
	});

}
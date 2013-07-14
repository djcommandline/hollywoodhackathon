////////////
// Routes //
////////////

module.exports = function (app, config, OpenTok) {
		var apiKey = '25925352';    // Replace with your API key  
		var secret = 'b10360ef840cd6659cd5d14d184f629926b55d30';  // Replace with your API secret  
		var opentok = new OpenTok.OpenTokSDK(apiKey, secret);
	
	app.get('/', function (req, res) {	

		opentok.createSession(config.root, {'p2p.preference':'disabled'}, function (result) {
	 		var data = {};

	 		data.apiKey = apiKey;
	 		data.sessionId = result;
	 		data.token = opentok.generateToken({session_id:data.sessionId, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});

	 		res.render('index', { data : data });

		});
	});

	app.get('/:sessionId', function (req, res) {

		var data = {};

		data.apiKey = apiKey;
		data.sessionId = req.params.sessionId;
		data.token = opentok.generateToken({session_id:data.sessionId, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});

		res.render('index', { data : data });
	});
	
	app.post('/email', function (req,res) {
		var email = req.body.email;
		var sessionId = req.body.sessionId;
		
		var SendGrid = require('sendgrid').SendGrid;
		var sendgrid = new SendGrid("kar2905", "science123");
		sendgrid.send({
		  to: email,
		  from: 'kar2905@gmail.com',
		  subject: 'Drizzle Fizzle Invite',
		  text: 'Click on this to get started http://drizzlefrizzle.com:3001/' + sessionId 
		}, function(success, message) {
			//res.render('email', { data : message });
			res.send("Success");

	  if (!success) {
  		  console.log(message);
 		 }
		});
		
	});



}
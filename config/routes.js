////////////
// Routes //
////////////

module.exports = function (app, config, OpenTok, routes) {
		var apiKey = '25925352';    // Replace with your API key  
		var secret = 'b10360ef840cd6659cd5d14d184f629926b55d30';  // Replace with your API secret  
		var opentok = new OpenTok.OpenTokSDK(apiKey, secret);
		var answer; 		
		var player = 1;
		var games = [];
	
	app.get('/image', function(req,res) {
		var image = req.query.file.replace(" ","_").toLowerCase();
		res.send("assets/images/"+image+".png");
		answer = image.replace("_"," ");
	});
	
	app.get("/answer", function(req,res) {
		res.send(answer);
	});

	app.get('/', function (req, res) {	


		opentok.createSession(config.root, {'p2p.preference':'disabled'}, function (result) {
	 		var data = {};

	 		data.apiKey = apiKey;
	 		data.sessionId = result;
	 		data.token = opentok.generateToken({session_id:data.sessionId, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});
			data.playerDiv = "player1";

			games[result] = {};
			games[result].players = 1;

	 		res.render('index', { data : data });

		});
	});

	app.get('/:sessionId', function (req, res) {
		if (games[req.params.sessionId]) {
			games[req.params.sessionId].players++;
		} else {
			res.redirect('/');
		}

		var data = {};

		data.apiKey = apiKey;
		data.sessionId = req.params.sessionId;
		data.token = opentok.generateToken({session_id:data.sessionId, role:OpenTok.RoleConstants.PUBLISHER, connection_data:"userId:42"});
		data.playerDiv = "player" + games[req.params.sessionId].players;

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
/////////////
// Express //
/////////////

module.exports = function (app, express, config) {

	app.configure(function () {		

		// Other Middleware
		
		app.use(express.favicon());
		app.use(express.bodyParser());
		//app.use(express.methodOverride());
		
		
		// Static Files
		app.use(express.static(config.root + '/public'));
		// app.use("/styles", express.static(__dirname + '/styles'));

		// Routing
		app.use(app.router);
		
		app.use(function(req, res) {
			
			// Use res.sendFile, as it streams instead of reading the file into memory.
			
			res.type('text/html');
			res.sendfile(config.root + '/index.html');
		});
		
		// Handle Errors
		app.use(function(err, req, res, next){
			console.log(err);
			res.status(500);
			res.send('500 error');
		});


	});

	app.configure('development', function(){
	  	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	  	app.use(express.logger('dev'));
	});

	app.configure('production', function(){
	  	app.use(express.errorHandler());
	});
}
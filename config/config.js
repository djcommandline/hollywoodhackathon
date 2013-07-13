///////////////////
// Configuration //
///////////////////

module.exports = function (path, port) {
	rootPath = path.normalize(__dirname + '/..');
	
	return {
		development: {
			root: rootPath,
			host: 'http://localhost:' + port,
			app: {
				name: 'Dev - Drizzle Frizzle'
			},
		},
		staging: {
			root: rootPath,
			app: {
				name: 'Stage - Drizzle Frizzle'
			},
		},
		production: {
			root: rootPath,
			host: rootPath,
			app: {
				name: 'Drizzle Frizzle'
			},
		},
	}
}
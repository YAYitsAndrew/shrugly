var Asciimoji = require('./models/asciimoji');
var path = require('path');

module.exports = function(app) {
	
	// server routes ===========================================================
	app.get('/api/asciimoji', function(req, res) {
		Asciimoji.find(function(err, asciimojis) {
			if(err) {
				res.send(err);
			}
			
			res.json(asciimojis);
		});
	});
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
	});

};
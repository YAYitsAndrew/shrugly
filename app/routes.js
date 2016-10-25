var Asciimoji = require('./models/asciimoji');
var path = require('path');

module.exports = function(app) {
	
	// server routes ===========================================================
	app.route('/api/asciimoji')
	.get(function(req, res) {
		Asciimoji.find(function(err, asciimojis) {
			if(err) {
				res.send(err);
			}
			
			res.json(asciimojis);
		});
	})
	.post(function(req, res) {
		var name = req.body.name;
		var ascii = req.body.ascii;
		
		var newObj = new Asciimoji({
			name: name,
			ascii: ascii
		});
		newObj.save(function(err, asciimoji) {
			if(err) {
				res.send(err);
			}
			
			res.json(asciimoji);
		});
	});
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
	});

};
var Asciimoji = require('./models/asciimoji');
var path = require('path');

module.exports = function(app) {
	
	// server routes ===========================================================
	app.route('/api/asciimoji/:id')
	.get(function(req, res) {
		Asciimoji.findById(req.params.id, function(err, asciimoji) {
			if(err) {
				res.send(err);
			}
			
			res.json(asciimoji);
		});
	})
	.delete(function(req, res) {
		Asciimoji.findByIdAndRemove(req.params.id, {}, function(err, asciimoji) {
			if(err) {
				res.send(err);
			}
			
			res.status(200).json(asciimoji);
		});
	});
	
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
		var newObj = {
			name: req.body.name,
			ascii: req.body.ascii
		};
		
		Asciimoji.create(newObj, function(err, asciimoji) {
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
var Asciimoji = require("./models/asciimoji");
var path = require("path");
var passport = require("passport");

module.exports = function(app) {
	
	// server routes ===========================================================
	var asciimojiRouteWithId = "/api/asciimoji/:id";
	var asciimojiRoute = "/api/asciimoji";
	
	app.get( asciimojiRouteWithId, function(req, res) {
		Asciimoji.findById(req.params.id, function(err, asciimoji) {
			if(err) {
				res.send(err);
			}
			
			res.json(asciimoji);
		});
	});
	
	app.delete(asciimojiRouteWithId,
		passport.authenticate('basic', { session: false }),
		function(req, res) {
			Asciimoji.findByIdAndRemove(req.params.id, {}, function(err, asciimoji) {
				if(err) {
					res.send(err);
				}

				res.status(200).json(asciimoji);
			});
		});
	
	app.get(asciimojiRoute, function(req, res) {
		Asciimoji.find(function(err, asciimojis) {
			if(err) {
				res.send(err);
			}
			
			res.json(asciimojis);
		});
	});
	
	app.post(asciimojiRoute,
		passport.authenticate('basic', { session: false }),
		function(req, res) {
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
	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "../public", "index.html"));
	});

};
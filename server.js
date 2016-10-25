// modules =================================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

// configuration ===========================================

// config files
var dbConfig = require("./config/db");

// connect to our mongoDB database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	// get all data/stuff of the body (POST) parameters
	// parse application/json
	app.use(bodyParser.json());

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
	app.use(methodOverride("X-HTTP-Method-Override"));

	// set the static files location /public/img will be /img for users
	app.use(express.static(__dirname + "/public"));

	// routes ==================================================
	require("./app/routes")(app);

	// start app ===============================================
	var port = process.env.PORT || 8080;
	app.listen(port, function() {
		console.log("Server started on port " + port);
	});
});

exports = module.exports = app;

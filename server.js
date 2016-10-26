// modules =================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;
var User = require("./app/models/user");

// configuration ===========================================
var app = express();

// load config values
var dbConfig = require("./config/db");
var adminConfig = require("./config/admin");
var port = process.env.PORT || 8080;

// connect to mongoDB database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//create the OG admin user for basic http auth
/*var newObj = {
	email: adminConfig.email,
	password: User.generateHash(adminConfig.password)
};

User.find({ email: newObj.email }, function(err, user) {
	if(user.length == 0) {
		User.create(newObj, function(err, user) {
			if(err) {
				console.log(err);
			}
		});
	}
});*/

//set up passport for basic http auth
passport.use(new BasicStrategy(
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if(err) {
				return done(err);
			}
			if(!user) {
				return done(null, false);
			}
			if(!user.validPassword(password)) {
				return done(null, false);
			}
			
			return done(null, user);
		});
	}
));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride("X-HTTP-Method-Override"));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + "/public"));

// routes ==================================================
require("./app/routes")(app);

// start app ===============================================
app.listen(port, function() {
	console.log("Server started on port " + port);
});

exports = module.exports = app;
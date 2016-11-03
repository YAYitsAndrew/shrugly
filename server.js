// modules =================================================
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
var User = require("./app/models/user");

// configuration ===========================================
var app = express();

//load config values
var mongodb_uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
var port = process.env.PORT || 8080;
var sessionSecret = process.env.SESSION_SECRET || "¯\_(ツ)_/¯ dev secret";

// database ================================================
var dbOptions = {
	server: {
		socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
	},
	replset: {
		socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
	}
};

mongoose.Promise = global.Promise;
mongoose.connect(mongodb_uri, dbOptions);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));

// authentication ==========================================
//set up passport strategy for local auth (used by /login)
passport.use(new LocalStrategy({ usernameField: 'email' }, function(username, password, done) {
	console.log("Authentication attempt for", username);
	User.findOne({ email: username }, function(err, user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			console.log("No user found.");
			return done(null, false, { message: "No user found."});
		}
		if(!user.validPassword(password)) {
			console.log("Invalid password.");
			return done(null, false, { message: "Invalid password."});
		}
		console.log("Successfully authenticated", user.email);
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.email);
});

passport.deserializeUser(function(id, done) {
	User.findOne({ email: id }, function(err, user) {
		if(err) {
			console.log(err);
			return done(err);
		}
		
		done(null, user);
	});
});

// session storage =========================================
var store = new MongoDBStore({
	uri: mongodb_uri,
	collection: "sessions"
});

store.on("error", console.error.bind(console, "session store error:"));

// middleware ==============================================
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: sessionSecret,
	name: "sessionid",
	cookie: {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 30 //1 month
	},
	store: store,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.disable("x-powered-by");

// routes ==================================================
require("./app/routes")(app);

// start app ===============================================
app.listen(port, function() {
	console.log("Server started on port " + port);
});

exports = module.exports = app;
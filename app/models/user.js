var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, required: true, default: false },
	customAsciimojis: [String]
});

userSchema.statics.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

userSchema.methods.getClientJson = function() {
	return {
		email: this.email,
		isAdmin: this.isAdmin,
		customAsciimojis: this.customAsciimojis
	};
}

module.exports = mongoose.model('User', userSchema);

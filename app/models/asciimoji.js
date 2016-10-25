var mongoose = require('mongoose');

var asciimojiSchema = mongoose.Schema({
	name: { type: String, required: true },
	ascii: { type: String, required: true }
});

module.exports = mongoose.model('Asciimoji', asciimojiSchema);

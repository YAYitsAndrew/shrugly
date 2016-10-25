var mongoose = require('mongoose');

var asciimojiSchema = mongoose.Schema({
	name: { type: String, default: '' },
	ascii: { type: String, default: '' }
});

module.exports = mongoose.model('Asciimoji', asciimojiSchema);

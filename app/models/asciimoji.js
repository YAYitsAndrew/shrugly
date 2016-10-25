var mongoose = require('mongoose');

var asciimojiSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId },
	name: { type: String, required: true },
	ascii: { type: String, required: true }
});

module.exports = mongoose.model('Asciimoji', asciimojiSchema);

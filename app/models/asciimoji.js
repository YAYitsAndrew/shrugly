var mongoose = require('mongoose');

module.exports = mongoose.model('Asciimoji', {
	name: { type: String, default: '' },
	ascii: { type: String, default: '' }
});

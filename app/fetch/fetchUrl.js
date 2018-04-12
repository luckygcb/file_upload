let superagent = require('superagent');

module.exports = function(url, callback) {
	superagent.get(url).end(function(err, res) {
		callback(err, res.text);
	})
}
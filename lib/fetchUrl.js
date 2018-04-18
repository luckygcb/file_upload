let superagent = require('superagent');

module.exports = function(url) {
	return new Promise(function(resolve, reject) {
		superagent.get(url).end(function(err, res) {
			if(err) {
				reject(err);
			} else {
				resolve(res.text);
			}
		})
	})
}
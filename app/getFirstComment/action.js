var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var async = require('async');
var fetchUrl = require('../../lib/fetchUrl');
var cnodeUrl = 'https://cnodejs.org/';

async function getFirstComment(req, res, next) {
	let indexHTML = await fetchUrl(cnodeUrl);
	
	var topicUrls = [];
  	var $ = cheerio.load(indexHTML);
  	$('#topic_list .cell').each(function (idx, element) {
    	var $element = $(element),
    		$title = $element.find('.topic_title'),
    		href = $title.attr('href');
    	topicUrls.push(url.resolve(cnodeUrl, href));
  	});
  	async.mapLimit(topicUrls, 5, function(url, callback) {
  		fetchUrl(url).then(function(html) {
  			callback(null, [ url, html]);
  		});
  	}, function(err, result) {
  		result = result.map(function(item) {
  			var $ = cheerio.load(item[1]);
  			return {
  				href: item[0],
  	 			title: $('.topic_full_title').text().trim(),
		 		comment1: $('.reply_content').eq(0).text().trim()
  	 		}
  		})
  		res.send(result);
  	})
}
module.exports = {
	getJson: getFirstComment
}
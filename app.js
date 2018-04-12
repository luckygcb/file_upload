/*
* @Author: shanlin.chi
* @Date:   2018-04-12 11:17:38
*/
var express = require('express');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var app = express();
var async = require('async');
var fetchUrl = require('./app/fetch/fetchUrl');

var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function (req, res, next) {
	superagent
		.get(cnodeUrl)
		.end(function(err, sres) {
			if (err) {
	        	return next(err);
	      	}
	    	var topicUrls = [];
	      	var $ = cheerio.load(sres.text);
	      	var items = [];
	      	$('#topic_list .cell').each(function (idx, element) {
	        	var $element = $(element),
	        		$title = $element.find('.topic_title'),
	        		$author = $element.find('.user_avatar img'),
	        		href = $title.attr('href');
	        	items.push({
	          		title: $title.attr('title'),
	          		href: href,
	          		author: $author.prop('title')
	        	});
	        	topicUrls.push(url.resolve(cnodeUrl, href));
	      	});
	      	async.mapLimit(topicUrls, 5, function(url, callback) {
	      		fetchUrl(url, callback);
	      	}, function(err, result) {
	      		result = result.map(function(html) {
	      			var $ = cheerio.load(html);
	      			return {
	      	 			title: $('.topic_full_title').text().trim(),
      		 			comment1: $('.reply_content').eq(0).text().trim()
	      	 		}
	      		})
	      		res.send(result);
	      	})
	      	// var ep = new eventproxy();
	      	// ep.after('topic_html', topicUrls.length, function(topics) {
	      	// 	topics = topics.map(function(item) {
	      	// 		var html = item[1];
	      	// 		var $ = cheerio.load(html);
	      	// 		return {
	      	// 			title: $('.topic_full_title').text().trim(),
      		// 			href: item[0],
      		// 			comment1: $('.reply_content').eq(0).text().trim(),
	      	// 		}
	      	// 	})
	      	// 	res.send(topics);
	      	// });
	      	// topicUrls.forEach(function(url) {
	      	// 	superagent.get(url).end(function(err, res) {
	      	// 		ep.emit('topic_html', [url, res.text]);
	      	// 	})
	      	// })
		})
});

app.listen(8000, function () {
  	console.log('app is listening at port 8000');
});
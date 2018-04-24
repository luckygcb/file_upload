/*
* @Author: shanlin.chi
* @Date:   2018-04-12 11:17:38
*/
var express = require('express');

var app = express();

var getFirstComment = require('./app/getFirstComment/action');
var fileUpload = require('./app/fileUpload/action');

require('./database/connectDataBase');
require('./app/dataHelper/user');
app.use(express.static('public'));

app.get('/getFirstComment', getFirstComment.getJson);

app.get('/getFileList', fileUpload.getFileList);
app.post('/fileUpload', fileUpload.upload, function (req, res) {
	if(req.file) {
		res.send('success');
	}
});
app.listen(8000, function () {
  	console.log('app is listening at port 8000');
});
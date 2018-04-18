/**
 * @fileOverview
 * @Author shanlin.chi
 * @Time 2018/4/18
 **/
var multer = require('multer');
var md5 = require('md5');
var fs = require('fs');
function getFileList(req, res) {
    fs.readdir('./uploads', function (err, files) {
        if(err) {
            console.log(err);
            res.end();
            return;
        }
        console.log(files);
        var fileList = [];
        files.forEach(function(filename) {
        
            fileList.push({
                name: 123
            });
        })
        res.send(fileList);
    })

}
var storage = multer.diskStorage({
    destination:  process.cwd() + '/uploads',
    filename: function (req, file, cb) {
        var fileFormat =(file.originalname).split(".");
        var fileExt = fileFormat.pop();
        fileFormat.push('-');
        fileFormat.push(Date.now());
        fileFormat.push('.' + fileExt);
        cb(null, fileFormat.join(''));
    }
});

exports.upload = multer({
    storage: storage
}).single('file');

exports.getFileList = getFileList;
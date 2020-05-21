var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    fs.readFile('./routes/parseFile/ccc.txt', 'utf8', function(err, data) {
        var files = data.split(/\r\n/g)
        var file = files.filter(function(item){
            return item
        })

        var json = {
            data:file
        }

        fs.writeFile('./routes/parseFile/cFormat.json', JSON.stringify(json), function(err) {
            if (err) console.log('写文件操作失败');
            else console.log('写文件操作成功');
        });

        res.send(json);
    });

    // res.render('paseFile', {
    //     title: 'paseFile'
    // });
});

module.exports = router;

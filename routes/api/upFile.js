var express = require('express');
var router = express.Router();
var util = require('../../util/util.js');

router.post('/', function(req, res, next) {
    let callback = function (res,filePath) {
        res.send({
            code:0,
            errno:0,
            msg: 'ok',
            data:[filePath]
        });
    }
    util.upFile(req, res, next, callback);
});

module.exports = router;

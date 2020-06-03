var express = require('express');
var router = express.Router();
var util = require('../../util/util.js');

// 获取历史消息
router.get('/', function(req, res)
{
    res.writeHead(200,
    {
        'Content-Type': 'application/json'
    });
    // 最新的50条
    // lastHs = history.filter(function(item, index)
    // {
    //     return index < 50;
    // });
    res.end(JSON.stringify(util.history));
});

module.exports = router;

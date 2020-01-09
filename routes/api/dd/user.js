var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var util = require('../../../util/util.js');

router.get('/',async function(req, res, next) {
    let code = req.query.code;
    let token = await util.getToken();
    let result = await util.getUserinfo(token,code);
    util.setData('token',token);
    util.setData('userInfo',result);

    // console.log(result);
    res.send(result);
});

module.exports = router;

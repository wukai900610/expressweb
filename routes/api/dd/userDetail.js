var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var util = require('../../../util/util.js');

router.get('/',async function(req, res, next) {
    let token = util.getData('token');
    // util.getData('userInfo');

    // console.log(result);
    res.send(token);
});

module.exports = router;

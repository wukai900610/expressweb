var express = require('express');
var router = express.Router();
var util = require('../../util/util.js');

router.get('/', async function(req, res, next) {
    let data=await util.myHttp('http://b2b.nigeriatex.com/api/b2bbanner?code=nt&lan=en')

    res.send(JSON.parse(data));
});

module.exports = router;

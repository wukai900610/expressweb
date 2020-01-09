var express = require('express');
var router = express.Router();
var util = require('../../util/util.js');

router.post('/', async function(req, res, next) {
    console.log(JSON.stringify(req.body));
    res.send({
        msg:'ok',
        data:req.body
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
    // res.cookie('name','wukai', { maxAge: 10000*2,signed:true});
    res.render('index', { title: 'Express' });
});

module.exports = router;

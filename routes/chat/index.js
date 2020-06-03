var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
    // res.cookie('name','wukai', { maxAge: 10000*2,signed:true});
    res.render('chat', { title: 'chat' });
});

module.exports = router;

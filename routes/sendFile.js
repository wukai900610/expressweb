var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var options = {
        root: path.join(__dirname, '../'),
        // dotfiles: 'deny',
        // headers: {
        //   'x-timestamp': Date.now(),
        //   'x-sent': true
        // }
    }
    // res.send('respond with a resource!!');
    res.sendFile('/upload/1-1.png', options)
});

module.exports = router;

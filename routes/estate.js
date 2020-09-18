var express = require('express');
var router = express.Router();
var util = require('../util/util.js');

/* GET home page. */
router.get('/',async function(req, res, next) {
    // let page = req.query.page || 1;
    // let pagesize = req.query.pagesize || 25;
    // let data=await util.myRequest('https://nanjing.anjuke.com/v3/ajax/rec/profile/?cityid=16&proids=1949480707%2C1949149953&resulttype=3&page='+ page +'&pagesize='+ pagesize +'&from=history_rec_list&showsoj=1&showprofile=1&r=0.4236293704605687');
    // console.log(data);
    res.render('estate', {
        title: 'Estate',
        // data: JSON.parse(data),
    });
});

module.exports = router;

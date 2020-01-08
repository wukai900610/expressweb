var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var util = require('../../util/util.js');

/* GET home page. */
router.get('/',async function(req, res, next) {
    // let page = req.query.page || 1;
    // let pagesize = req.query.pagesize || 25;
    // let kw = req.query.kw;
    let appkey = 'dingme8tq4nxnltsabbv';
    let appsecret = 'ZiTmL0mezMmjJg6y9nn2yCKb1dlQpv8dEbjXj_h8hJGqB7MQVtN-B86g-YGOFy7B';
    let SSOsecret = 'RIfv2R5ZaGoWWna0cjcoK_l3NBurqGl2zOuSBbUlhYlj4Hx7u45YUWY_5yN4ATuJ';
    let result = await util.myHttps('https://oapi.dingtalk.com/gettoken?appkey='+appkey+'&appsecret='+appsecret);

    result = JSON.parse(result);
    console.log(result);
    // let corpid = 'dingb49e03419a3d675cf2c783f7214b6d69';
    // let result2 = await util.myHttps('https://oapi.dingtalk.com/user/getuserinfo?code='+corpid+'&access_token='+result.access_token);
    // console.log(JSON.parse(result2));

    res.send(result);
    // res.send({
    //     result:result,
    //     result2:JSON.parse(result2),
    // });
});

module.exports = router;

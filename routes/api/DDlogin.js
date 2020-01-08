var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var util = require('../../util/util.js');

/* GET home page. */
router.get('/',async function(req, res, next) {
    let code = req.query.code;
    let result = await util.myHttps('https://oapi.dingtalk.com/sns/getuserinfo_bycode',{
        method:'POST',
        data:{
            tmp_auth_code:code,
            accessKey:'dingoabjync3iwe8emwmwq',
            timestamp: new Date().getTime(),
            signature:'ljbm3ruDTgNjwJ0TEKg0dhS5NpoyqJM4A8kxfjx5D1DfLmwqE7AoS-nGCFRyGYSq',
        }
    });

    // let appkey = 'dingme8tq4nxnltsabbv';
    // let appsecret = 'ZiTmL0mezMmjJg6y9nn2yCKb1dlQpv8dEbjXj_h8hJGqB7MQVtN-B86g-YGOFy7B';
    // let SSOsecret = 'RIfv2R5ZaGoWWna0cjcoK_l3NBurqGl2zOuSBbUlhYlj4Hx7u45YUWY_5yN4ATuJ';
    // let result = await util.myHttps('https://oapi.dingtalk.com/gettoken?appkey='+appkey+'&appsecret='+appsecret);
    //
    // result = JSON.parse(result);
    //
    // let result2 = await util.myHttps('https://oapi.dingtalk.com/user/getuserinfo?code='+code+'&access_token='+result.access_token);
    console.log(result);
    // console.log(result2);

    res.send({});
});

module.exports = router;

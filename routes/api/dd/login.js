var express = require('express');
var cheerio = require('cheerio');
var sha256 = require('sha256');
var cryptoJS = require('crypto-js/crypto-js');
var sha1 = require('sha1');
var router = express.Router();
var util = require('../../util/util.js');

function getSign(appSecret, timestamp, url){
  	let str = 'appSecret=' + appSecret + '&timestamp=' + timestamp;
    let sign = sha1(str);
    return sign;
}

router.get('/',async function(req, res, next) {
    let code = req.query.code;
    let timestamp = new Date().getTime();
    let accessKey = 'dingoabjync3iwe8emwmwq';//appId
    let appSecret = 'ljbm3ruDTgNjwJ0TEKg0dhS5NpoyqJM4A8kxfjx5D1DfLmwqE7AoS-nGCFRyGYSq';
    let url = 'https://oapi.dingtalk.com/sns/getuserinfo_bycode';

    let signature = getSign(appSecret, timestamp, url);
    // let signature = cryptoJS.HmacSHA256(timestamp, appSecret);
    console.log(signature);

    let result = await util.myHttps(url+'?accessKey='+accessKey+'&signature='+encodeURI(signature)+'&timestamp='+timestamp,{
        method:'post',
        data:{
            tmp_auth_code:code,
        }
    });

    res.send(result);
});

module.exports = router;

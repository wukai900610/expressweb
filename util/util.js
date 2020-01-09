var http = require('http');
var https = require('https');

let storageData = {};
const util = {
    myHttp: function(url, config) {
        config = config || {};
        let options = {
            method: config.method || 'get',
        };

        let promise = new Promise(function(resolve, rejecte) {
            let req = http.request(url, options, (res) => {
                res.setEncoding('utf8');
                 let finalData = '';
                res.on('data', (d) => {
                    finalData += d;
                });
                res.on('end', (d) => {
                    resolve(finalData.toString())
                });
            }).on('error', (e) => {
                console.error(e);
            });
            req.end();
        })
        return promise;
    },
    myHttps: function(url, config) {
        config = config || {};
        let options = {
            method: config.method || 'get',
            data:config.data
        };

        let promise = new Promise(function(resolve, rejecte) {
            let req = https.request(url, options, (res) => {
                res.setEncoding('utf8');
                 let finalData = '';
                res.on('data', (d) => {
                    finalData += d;
                });
                res.on('end', (d) => {
                    resolve(finalData.toString())
                });
            }).on('error', (e) => {
                console.error(e);
            });
            req.end();
        })
        return promise;
    },
    getToken: async function () {
        let result = await util.myHttps('https://oapi.dingtalk.com/gettoken?appkey=dingcpkf8oosoicxx57x&appsecret='+encodeURI('XfEiNbTU-qLNMU309oLlZ67vvnqDWUgVN2gIEdfTvS-uMQ2lixLYN_WpBsS6U9Dg'));
        result = JSON.parse(result);
        return result.access_token;
    },
    getUserinfo: async function (token,code) {
        let result = await util.myHttps('https://oapi.dingtalk.com/user/getuserinfo?access_token='+token+'&code='+code);
        result = JSON.parse(result);
        return result;
    },
    setData:function (key, value) {
        storageData[key] = value;
    },
    getData:function (key) {
        return storageData[key];
    },
    delData:function (key) {
        delete storageData[key];
    }
}

module.exports = util;

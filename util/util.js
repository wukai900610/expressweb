var http = require('http');
var https = require('https');
var axios = require('axios');
var Qs = require('qs');
var moment = require('moment');
var multiparty = require('multiparty');
var fs = require('fs');

let storageData = {};
const util = {
    history:[],
    mkdir:function (dir) {
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
    },
    upFile: function(req, res, next, callback) {
        var form = new multiparty.Form();
        var UPLOAD_DIR = './upload/'
        form.parse(req, function(err, fields, files) {
            // console.log(files);
            var filesTemp = JSON.stringify(files, null, 2);
            if (err) {
                console.log('parse error:' + err);
            } else {
                // console.log('parse files:' + filesTemp);
                var file = files.uploadFile[0];
                var uploadedPath = file.path;
                util.mkdir(UPLOAD_DIR);
                var dstPath = UPLOAD_DIR + file.originalFilename;
                //重命名为真实文件名
                var readStream = fs.createReadStream(uploadedPath);
                var writeStream = fs.createWriteStream(dstPath);
                readStream.pipe(writeStream);
                readStream.on('end', function() {
                    fs.unlinkSync(uploadedPath);

                    callback(res);
                });
            }
        });
    },
    wait:async function (time) {
        if(time){
            return await new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, time);
            });
        }
    },
    getTime:function () {
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    },
    myRequest:function (url, config){
        // var randAgent = parseInt(Math.random()*19);
        let options = Object.assign({
            method: 'get',
            url:url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: [function(data) {
                data = Qs.stringify(data);
                return data;
            }]
        }, config);
        options.proxy = null;

        let promise = new Promise(function(resolve, reject) {
            axios(options).then(function(response) {
                if(response.data){
                    resolve(response.data);
                }else {
                    reject(url+' 无response.data');
                    return false;
                }
            }).catch(function(error) {
                reject(url+' catch异常');
                return false;
            });

            setTimeout(function () {
                reject(url+' 请求超时');
                return false;
            }, 10000);
        });

        return promise;
    },
    myHttp: function(url, config) {
        let options = Object.assign({
            method: 'get'
        }, config);

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
        let options = Object.assign({
            method: 'get'
        }, config);

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
    getToken: async function() {
        let result = await util.myHttps('https://oapi.dingtalk.com/gettoken?appkey=dingcpkf8oosoicxx57x&appsecret=' + encodeURI('XfEiNbTU-qLNMU309oLlZ67vvnqDWUgVN2gIEdfTvS-uMQ2lixLYN_WpBsS6U9Dg'));
        result = JSON.parse(result);
        return result.access_token;
    },
    getUserinfo: async function(token, code) {
        let result = await util.myHttps('https://oapi.dingtalk.com/user/getuserinfo?access_token=' + token + '&code=' + code);
        result = JSON.parse(result);
        return result;
    },
    setData: function(key, value) {
        storageData[key] = value;
    },
    getData: function(key) {
        return storageData[key];
    },
    delData: function(key) {
        delete storageData[key];
    },
    userAgents:[
        'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
        'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
        'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
        'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
        'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
        'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
        'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    ]
}

module.exports = util;

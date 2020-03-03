var http = require('http');
var https = require('https');
var multiparty = require('multiparty');
var fs = require('fs');

let storageData = {};
const util = {
    upFile: function(req, res, next, callback) {
        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            // console.log(files);
            var filesTemp = JSON.stringify(files, null, 2);
            if (err) {
                console.log('parse error:' + err);
            } else {
                // console.log('parse files:' + filesTemp);
                var file = files.uploadFile[0];
                var uploadedPath = file.path;
                var dstPath = './upload/' + file.originalFilename;
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
    }
}

module.exports = util;

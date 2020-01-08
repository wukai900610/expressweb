var http = require('http');
var https = require('https');

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
            // data:config.data
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
    }
}

module.exports = util;

var http = require('http');
var https = require('https');

const util = {
    myHttp:function (url) {
        let promise=new Promise(function (resolve, rejecte) {
            let req=http.get(url)
             req.on("response",function (res) {
                 let finalData='';
                 res.on("data",function (data) {
                     finalData+=data;
                 });
                 res.on('end', function(date){
                     resolve(finalData.toString())
                 })
             });
        })
        return promise;
    },
    myHttps:function (url) {
        let promise=new Promise(function (resolve, rejecte) {
            let req=https.get(url)
             req.on("response",function (res) {
                 let finalData='';
                 res.on("data",function (data) {
                     finalData+=data;
                 });
                 res.on('end', function(date){
                     resolve(finalData.toString())
                 })
             });
        })
        return promise;
    }
}

module.exports = util;

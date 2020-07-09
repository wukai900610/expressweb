// var http = require('http');
var cheerio = require('cheerio');
var https = require('https');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect();

function myHttps(url, config) {
    let options = Object.assign({
        method: 'get',
    }, config);

    let promise = new Promise(function(resolve, rejecte) {
        let req = https.request(url, options, (res) => {
            res.setEncoding('utf8');
            let finalData = '';
            res.on('data', (d) => {
                // console.error(d);
                finalData += d;
            });
            res.on('end', (d) => {
                resolve(finalData.toString())
            });
        }).on('error', (e) => {
            // console.error(e);
        });
        req.end();
    })
    return promise;
}

function insertData(data) {
    var paramsName ='';
    var values ='';
    var addSqlParams = [];
    for (var i in data){
        paramsName = paramsName +',' + i
        values = values + ',?'

        if(typeof(data[i]) == 'object'){
            addSqlParams.push(data[i].toString())
        }else{
            addSqlParams.push(data[i])
        }
    }
    var addSql = 'INSERT INTO mdc_product(id' + paramsName + ') VALUES(0' + values + ')'
    // console.log(addSql);
    console.log(addSqlParams);
    // return false;
    //增
    connection.query(addSql, addSqlParams, function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
    });
}

let url = 'https://www.made-in-china.com/Agriculture-Food-Catalog/Garlic.html';
let page = 1;
let currentPageTotalSize;
function getPageTotalSize(query) {
    currentPageTotalSize = query('.pager .page-dis').text();
}
async function getData() {
    let result = await myHttps(url, {
        method: 'get',
        // data: {
        //     pagesize: 10,
        //     category: 'All',
        //     children: 'All',
        //     page: page
        // }
    });
    let $ = cheerio.load(result);
    let itemData = [];
    $('.search-list .list-node').each(function (index) {
        let title = $(this).find('.product-name').text();
        let link = $(this).find('.product-name a').attr('href');
        let imgSrc = $(this).find('.img-thumb img').attr('src');
        let orderInfo = $(this).find('.product-property').text().replace('\t','');
        // let desc = $(this).find('.extra-property').text().replace(/\n/g,'').replace(/\t/g,'');
        let item = {
            title:title.trim(),
            link:link,
            imgSrc:imgSrc,
            // orderInfo:orderInfo,
            // desc:desc.trim(),
        };
        // itemData.push(item)
        console.log(item);
        insertData(item);
    });
    if(!currentPageTotalSize){
        getPageTotalSize($);
    }
    page++;
    if (page <= currentPageTotalSize) {
        setTimeout(function() {
            console.log('获取第'+page+'页数据');
            getData();
        }, 1000);
    }
}
getData();
// connection.end();

var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var util = require('../../util/util.js');

let data = [];
let page = 1;

async function getList(kw) {
    // let result=await util.myHttps('https://nanjing.anjuke.com/sale/jiangninga/p'+page+'-rd1-t25/#filtersort?kw='+kw);
    let url = 'https://nanjing.anjuke.com/sale/rd1/?from=zjsr&kw=' + encodeURI(kw);
    let result=await util.myHttps(url);
    let $ = cheerio.load(result);
    let itemData = [];
    $('.houselist-mod-new .list-item').each(function () {
        let title = $(this).find('.houseListTitle').text();
        let link = $(this).find('.houseListTitle').attr('href');
        let details = [];
        details[0] = $(this).find('.details-item').eq(0).find('span').eq(0).text();
        details[1] = $(this).find('.details-item').eq(0).find('span').eq(1).text();
        details[2] = $(this).find('.details-item').eq(0).find('span').eq(2).text();
        details[3] = $(this).find('.details-item').eq(0).find('span').eq(3).text();
        let adress = $(this).find('.comm-address').text();
        let price = $(this).find('.price-det').text();
        let unitPrice = $(this).find('.unit-price').text();
        itemData.push({
            title:title.trim(),
            link:link,
            details:details,
            adress:adress.trim().split('\n').map(item=>{return item.trim()}),
            price:price,
            unitPrice:unitPrice,
        });
    });
    data = data.concat(itemData);
    page++;

    // if(page<=1){
    //     await getList();
    // }
}

router.get('/',async function(req, res, next) {
    // let page = req.query.page || 1;
    // let pagesize = req.query.pagesize || 25;
    data = [];
    let kw = req.query.kw;
    // let result=await util.myHttps('https://nanjing.anjuke.com/sale/jiangninga/rd1/');
    // console.log(kw);
    await getList(kw);
    res.send({
        data:data
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('../../util/util.js');

router.get('/', function(req, res, next) {
    let yearMonthDay = 'nigeria-tool-doczj'
    let obj = [
        {
            key:'offlineUrl',
            value:'www.westafricatech.com'
        },{
            key:'offlineName',
            value:'2020中国机电产品（尼日利亚）展览会官网'
        },{
            key:'yearMonthDay',
            value:yearMonthDay
        },{
            key:'onlineUrl',
            value:yearMonthDay+'.matchupexpo.com'
        },{
            key:'all_title',
            value:'2019 Premium Mechatronic Brands China in Nigeria (Co-located with Lagos International Trade Fair)'
        },{
            key:'title',
            value:'2020浙江出口网上交易会（尼日利亚站-工具专场）'
        },{
            key:'titleEn',
            value:'2020 Zhejiang Export Online Fair (Nigeria-Tools)'
        },{
            key:'startDay',
            value:'2020/5/25'
        },{
            key:'timeDuration',
            value:5
        },{
            key:'date',
            value:'5月25-29日'
        },{
            key:'dateEn',
            value:'May 25-29'
        }
    ]

    let filePath = './routes/uaecEmail/'
    let fileArr = ['all.html', 'PushBuyer.html', 'CheckedSupplier.html', 'Supplier.html', 'SupplierReceived.html', 'Buyer.html', 'BuyerRecived.html']
    let fileIndex = 0

    function doFile() {
        fs.readFile(filePath + fileArr[fileIndex], 'utf8', function(err, data) {
            // console.log(data);
            for(var i=0;i<obj.length;i++){
                // console.log(item);
                let item = obj[i]
                var re = new RegExp("{{" + item.key + "}}", "g");
                data = data.replace(re, item.value);
            }

            util.mkdir(filePath + 'dist/' + yearMonthDay)
            fs.writeFile(filePath + 'dist/' + yearMonthDay + '/' +fileArr[fileIndex], data, function(err) {
                if (err){
                    console.log('文件'+fileIndex+'写操作失败');
                }else{
                    console.log('文件'+fileIndex+'操作成功');
                    fileIndex++;
                    doFile()
                    if(fileIndex >= fileArr.length-1){
                        res.send('ok:'+fileIndex);
                    }
                }
            });
        });
    }

    doFile();
    // res.send('ok');
});

module.exports = router;

var fs = require('fs');
var util = require('../util/util.js');
var config = require('./config.js');

let yearMonthDay = 'nigeria-hometextile-doczj'
let obj = config[yearMonthDay]

let filePath = './uaecEmail/'
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

                if(fileIndex == fileArr.length-1){
                    console.log('ok:'+fileIndex);
                }
            }
        });
    });
}

doFile();

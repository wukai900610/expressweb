var fs = require('fs');
var util = require('../util/util.js');
var config = require('./config.js');

// let yearMonthDay = 'nigeria-buildingmaterial-doczj'
// let obj = config[yearMonthDay]

let filePath = './uaecEmail/'
let fileArr = ['all.html', 'PushBuyer.html', 'CheckedSupplier.html', 'Supplier.html', 'SupplierReceived.html', 'Buyer.html', 'BuyerRecived.html']

// let fileIndex = 0;
for( let yearMonthDay in config){
    let fair = config[yearMonthDay];

    // 创建对应邮件项目目录
    util.mkdir(filePath + 'dist/' + yearMonthDay)

    fileArr.map((item,index)=>{
        fs.readFile(filePath + fileArr[index], 'utf8', (err, fileData)=>{
            writeFile(fileData,fair,yearMonthDay,index)
        });
    })
}

function writeFile(fileData,fair,yearMonthDay,index) {
    for(var i=0;i<fair.length;i++){
        // console.log(item);
        let item = fair[i]
        var re = new RegExp("{{" + item.key + "}}", "g");
        fileData = fileData.replace(re, item.value);
    }

    // return false;
    fs.writeFile(filePath + 'dist/' + yearMonthDay + '/' +fileArr[index], fileData, function(err) {
        if (err){
            console.log(yearMonthDay+':文件名'+fileArr[index]+'写操作失败');
        }else{
            // console.log(yearMonthDay+':文件'+index+'操作成功');
            // doFile()
            //
            // if(fileIndex == fileArr.length-1){
            //     console.log('ok:'+fileIndex);
            // }
        }
    });
}

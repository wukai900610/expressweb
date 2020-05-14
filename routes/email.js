var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

router.get('/', function(req, res, next) {

    var transporter = nodemailer.createTransport({
        //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: '744982965@qq.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: 'wk051105'
        }
    });

    var mailOptions = {
        from: '744982965@qq.com', // 发件地址
        to: 'wuk@uaec-expo.com', // 收件列表
        subject: 'Hello sir', // 标题
        //text和html两者只支持一种
        text: 'Hello world ?', // 标题
        html: '<b>Hello world ?</b>' // html 内容
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });

    res.render('email', {
        title: 'email'
    });
});

module.exports = router;

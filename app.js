var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// 解析Post参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    // console.log(req.signedCookies.name);
    next();
});

// page
app.use('/', require('./routes/index'));
app.use('/estate', require('./routes/estate'));
app.use('/users', require('./routes/users'));
app.use('/sendFile', require('./routes/sendFile'));
app.use('/ding', require('./routes/ding'));
app.use('/trip', require('./routes/trip'));
app.use('/paseFile', require('./routes/parseFile/'));//解析文件
app.use('/email', require('./routes/email'));

// other
app.use('/api/getIndex', require('./routes/api/getIndex'));
app.use('/api/getEstate', require('./routes/api/getEstate'));

// test
app.use('/api/postIndex', require('./routes/api/postIndex'));
app.use('/apis/upFile', require('./routes/api/upFile'));

// ding接口
app.use('/api/dd/user', require('./routes/api/dd/user'));
app.use('/api/dd/userDetail', require('./routes/api/dd/userDetail'));
// app.use('/api/dd/login', require('./routes/api/dd/login'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

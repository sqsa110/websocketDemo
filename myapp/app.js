var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);
var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');
var errorhandler = require('./errorhandler');
var cookie = require('cookie');
var session_storage = new RedisStore({
  host : '192.168.3.200',
  port : 6379,
  ttl : 60*60,
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.set('view engine','ejs');
//app.engine('.html',require('ejs').__express);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//处理页面访问异常
app.use(errorhandler());

app.use(cookieParser('keyboard'));
app.use(expressSession({
  resave : false,
  saveUninitialized : true,
  key : 'sid',
  secret : 'keyboard',
  store : session_storage,
  secret : 'keyboard cat'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/chat',chat);
app.use('/users', users);

app.ready = function(server){
  chat.preparseSocketIo(server,cookie,session_storage);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//处理报错

process.on('uncaughtException',function(err){
  console.log('An uncaughtException was caught...& the server will shutdown after the note..');
  console.log(err.stack);
  process.exit(1);
});

module.exports = app;

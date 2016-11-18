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
//var chat = require('./routes/chat');
var errorhandler = require('./errorhandler');
var socketio = require('socket.io');
var cookie = require('cookie');
var session_storage = new RedisStore({
  host : '172.16.5.243',
  port : 6379,
  //  db : 'mydb',
  //  pass : 'keyboard',
  ttl : 60*60,
//    pass : 'keyboard'
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
  store : new RedisStore({
//    host : '172.16.5.243',
    host : '192.168.3.200',
    port : 6379,
    ttl : 60*60,
  }),
  secret : 'keyboard cat'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/chat',chat);
app.use('/users', users);

app.ready = function(server){
//  chat.preparseSocketIo(server);
    var io = socketio.listen(server);
  
    io.use(function(socket,next){
      console.log(socket.request.headers);

      if(!socket.request.headers.cookie){
        return next('NO cookie transitted.',false);
      }
      socket.request.cookie = cookie.parse(socket.request.headers.cookie);
      var sid = socket.request.cookie['sid'];
      if(!sid){
        next(null,false);
      }
      sid = sid.substr(2).split('.');
      sid = sid[0];
      console.log(sid);
      socket.request.sessionID = sid;
      socket.request.getSession = function(cb){
        session_storage.get(sid,function(err,session){
          if(err || !session){
            next(err,false);
            return;
          }
          cb(err,session);
        });
      }

      next(null,true);

 //     next(new Error('Authentication error'));

    });
    
  /*

    io.configure('development',function(){

      io.set('authorization',function(data,accept){
        if(!data.header.cookie){
          return accept('NO cookie transmitted.',false);
        }
        data.cookie = cookie.parse(data.headers.cookie);

        var sid = data.cookie['sid'];

        if(!sid){
          accept(null,false);
        }
        sid = sid.substr(2).split('.');
        sid = sid[0];
        data.sessionID = sid;
        data.getSession = function(cb){
          session_storage.get(sid,function(err,session){
            if(err || !session){
              console.log(err);
              accept(err,false);
              return;
            }
            cb(err,session);
          });
        }
        accept(null,true);
      });

      console.log(1);
    });*/
    io.sockets.on('connection',function(socket){
      socket.join('chat');
      socket.on('message',function(data){
        socket.handshake.getSession(function(err,session){
          data['user'] = session.name || 'guest';
          io.sockets.in('chat').emit('message',data);
        });
      });
    });
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

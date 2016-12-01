var express = require('express');
var router = express.Router();
var socket_io= require('socket.io');
//var socketioAuth = require('socketio-auth');
//var cookieParser = require('cookie-parser');
//var parseCookie = express.cookieParser('keyboard cat');
//var storeMemory = express.session;

var connection = require('./mysql-conf');

/*
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '172.16.5.243',
	port : '3306',
	user : 'root',
	password : 'p@ssw0rd',
	database : 'websocketdemo'
});
*/
var _socket = {};
function authenticate(data,callback){
	var username = data.username;
	var password = data.password;

	db.findUser('User',{username:username},function(){
		if(err || !user) return callback(new Error("User not found"));
		return callback(null,user.password == password);
	});
}

/* GET home page. */
router.get('/chat', function(req, res, next) {
 	res.render('index', { title: 'Express' });
});

router.get('/mysql',function(req,res,next){
	connection.connect();
	connection.query('SELECT * from users',function(err,rows,fields){
		if(err) throw err;
		console.log(rows[0]);
	});
	connection.end();
	res.send({"aaa":"bbb"});
});

router.get('/socket',function(req,res,next){
	_socket.socket.emit('chat','alksdfjls','sdfkl');
	_socket.socket.broadcast.emit('chat','alksdfjls','sdfkl');
	res.send({"aaa":"bbb"});
});

router.preparseSocketIo = function(server,cookie,session_storage){
		var io = socket_io.listen(server);

		io.set('authorization',function(socket,next){
			console.log(socket.headers);
			if(!socket.headers.cookie){
			  return next('NO cookie transitted.',true);
			}
			socket.cookie = cookie.parse(socket.headers.cookie);
			var sid = socket.cookie['sid'];
			if(!sid){
			  next(null,true);
			}
			sid = sid.substr(2).split('.');
			sid = sid[0];
			console.log(sid);
			socket.sessionID = sid;
			socket.getSession = function(cb){
			  session_storage.get(sid,function(err,session){
			    if(err || !session){
			      next(err,true);
			      return;
			    }
			    cb(err,session);
			  });
			}
			next(null, true);
			//  next(null,true);
		});

 //     next(new Error('Authentication error'));

//  	});
    
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
  /*
      socket.join('chat');
      socket.on('message',function(data){
        socket.handshake.getSession(function(err,session){
          data['user'] = session.name || 'guest';
          io.sockets.in('chat').emit('message',data);
        });
      });
      */
    });	
/*
	_socket.io = io;
	io.of('/chat')
	.on('connection',function(socket){

		_socket.socket = socket;
		socket.on('join',function(user){
			socket.user = user;
			socket.emit('state','SERVER',true);
			socket.broadcast.emit('state','SERVER',user+'上线了');
		});
		socket.on('sendMSG',function(msg){
			socket.emit('chat',socket.user,msg);
			socket.broadcast.emit('chat',socket.user,msg)
		});

	});
	*/
}

module.exports = router;

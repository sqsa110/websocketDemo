var express = require('express');
var router = express.Router();
var socket_io= require('socket.io');
var socketioAuth = require('socketio-auth');
var parseCookie = express.cookieParser('keyboard cat');
var storeMemory = new express.session.RedisStore();
console.log(storeMemory);
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '172.16.5.243',
	port : '3306',
	user : 'root',
	password : 'p@ssw0rd',
	database : 'websocketdemo'
});

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
//	socket.emit('chat','SERVER','aaaa1111');
	_socket.socket.emit('chat','alksdfjls','sdfkl');
	_socket.socket.broadcast.emit('chat','alksdfjls','sdfkl');
	res.send({"aaa":"bbb"});
});

router.preparseSocketIo = function(server){
	var io = socket_io.listen(server);
	io.set('authorization',function(handshakeData,callback){
		if(!handshakeData.headers.cookie){
			return callback('no found cookie',false);
		}
		//	var session = socket.handshake.session;
		//	var name = session.user;
		handshakeData.cookie = parseCookie(handshakeData.headers.cookie);
		var connect_sid = handshakeData.cookie['connect_sid'];
		if(connect_sid){
			storeMemory.get(connect_sid,function(error,session){
				if(error){
					callback(error.message,false);
					console.log("session:" + session);
				} else {
					handshakeData.session = session;
					callback(null,true);
				}
			});
		} else {
			callback('nosession');
		}
	});
	/*
	socketioAuth(io,{
		authenticate : authenticate,	
	//	postAuthenticate : postAuthenticate,
		timeout : 1000
	});
	*/

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
}

module.exports = router;

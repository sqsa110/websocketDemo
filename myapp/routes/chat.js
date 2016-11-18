var express = require('express');
var router = express.Router();
var socket_io= require('socket.io');
var socketioAuth = require('socketio-auth');
//var cookieParser = require('cookie-parser');
//var parseCookie = express.cookieParser('keyboard cat');
//var storeMemory = express.session;

var utils = require('connect/lib/utils.js');
var cookie = require('connect/node_modules/cookie-parser/node_modules/cookie');
var redis = require('redis');
var client = redis.createClient(6379,'172.16.5.243');

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

	/*
	socketioAuth(io,{
		authenticate : authenticate,	
	//	postAuthenticate : postAuthenticate,
		timeout : 1000
	});
	*/
	io.sockets.authorization(function(handshakeData,callback){
		var cookies = handshakeData.headers.cookie;
		var secret = 'love';
		var key = 'love';
		if(cookies){
			cookies = cookie.prese(cookies);
			cookies = utils.parseSignedCookies(cookies,secret);
			cookies = utils.parseJSONCookies(cookies);
			if(cookies[key]){
				session = JSON.parse(cookies[key]);
			}
		}
	});

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

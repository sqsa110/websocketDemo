var express = require('express');
var router = express.Router();
var socket_io= require('socket.io')
var _socket = {};
/* GET home page. */
router.get('/chat', function(req, res, next) {
 	res.render('index', { title: 'Express' });
});

router.get('/socket',function(req,res,next){
//	socket.emit('chat','SERVER','aaaa1111');
	_socket.socket.emit('chat','alksdfjls','sdfkl');
	_socket.socket.broadcast.emit('chat','alksdfjls','sdfkl');
	res.send({"aaa":"bbb"});
});

router.preparseSocketIo = function(server){
	var io = socket_io.listen(server);
	_socket.io = io;
	io.sockets.on('connection',function(socket){
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

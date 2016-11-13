var socket_io = require('socket.io');

function SocketIo(server){
	this.io = socket_io.listen(server);
	this.init();
}

SocketIo.prototype.init = function(){
	var that = this;
	this.io.sockets.on('connection',function(socket){
		console.log('连接成功');
		that.socket = socket;
		that.getClick1Ev();
	});
	return this;
}

SocketIo.prototype.getClick1Ev= function(){
	var that = this;
	this.socket.on('click1',function(){
		console.log('监听点击事件');
		var datas = [1,2,3,4,5];
		that.sendClick2Ev(datas);
	});
	return this;
}

SocketIo.prototype.sendClick2Ev = function(datas){
	this.socket.emit('click2',{datas:datas});	//非广播
//	socket.broadcast.emit('click2',{datas:datas});	//广播
	return this;
}

ScoketIo.prototype.sendEmailInfoEv = function(datas){
	this.socket.broadcast.emit('emailInfo',{datas:datas});
}

module.exports= SocketIo;
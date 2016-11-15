var Io = require('./socketio');

var socketIoObj = {};
socketIoObj.init = function(server){
	this.socketIo = new Io(server);
}

module.exports = socketIoObj;
/*
var socket = io();
function a(){
	socket.emit('click1');
}

//监听click2事件
socket.on('click2',function(data){
	var htmldatas = data.datas;
	var html = '';
	for(var i=0; i<htmldatas.length; i++){
		var htmldata = htmldatas[i]
		html += '<li>' + htmldata + '</li>';
	}
	document.getElementById('ultext').innerHTML = html;
})
*/
socket = io.connect('http://127.0.0.1:3000/');
function a(){
	socket.emit('click1');
}
socket.on('click2',function(data){
	console.log('我收到广播了');
	var htmldatas = data.datas;
	var html = '';
	for(var i=0; i<htmldatas.length; i++){
		var htmldata = htmldatas[i]
		html += '<li>' + htmldata + '</li>';
	}
	document.getElementById('ultext').innerHTML = html;
})
$(document).ready(function() {
    var socket = io.connect('/');

    socket.on('connect', function(reason) {
        console.log('connected',reason);
    });

    socket.on('connect_failed',function(reason){
        console.log('connect_failed',reason);
    });

    socket.on('error',function(reason){
        console.log('err',reason);
    });

    socket.on('disconnect',function(reason){
        console.log('disconnect',reason);
    });

    socket.on('reconnect_failed',function(reason){
        console.log('reconnect_failed',reason);
    });

    socket.on('reconnect',function(reason){
        console.log('reconnect',reason);
    });

    socket.on('message', function(data) {
        var chat_message = data['user'] + ': ' + data['message'];
        $('#log').val($('#log').val() + '\n' + chat_message);
        $('#log').scrollTop(100000);
    });

    $('#send').click(function() {
        var msg = $('#message').val();
        socket.emit('message', {'message': msg});
        $('#message').val('');
    });
});
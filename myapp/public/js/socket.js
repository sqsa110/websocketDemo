define(function(require,exports,module){

    function WebSocket(){
    }

    WebSocket.prototype.init = function(){
        this.linkInit();
        return this;
    }

    WebSocket.prototype.linkInit = function(){
        this.socket = io.connect('/');
        this.defaultEv();
        this.customEv();
        return this;
    }

    WebSocket.prototype.defaultEv = function(){
        this.socket.on('connect', function(reason) {
            console.log('connected',reason);
        });

        this.socket.on('connect_failed',function(reason){
            console.log('connect_failed',reason);
        });

        this.socket.on('error',function(reason){
            console.log('err',reason);
        });

        this.socket.on('disconnect',function(reason){
            console.log('disconnect',reason);
        });

        this.socket.on('reconnect_failed',function(reason){
            console.log('reconnect_failed',reason);
        });

        this.socket.on('reconnect',function(reason){
            console.log('reconnect',reason);
        });

        this.socket.on('message', function(data) {
            console.log('message',data);
            /*
            var chat_message = data['user'] + ': ' + data['message'];
            $('#log').val($('#log').val() + '\n' + chat_message);
            $('#log').scrollTop(100000);
            */
        });


    }

    WebSocket.prototype.customEv = function(){

    }


    /*
    $('#send').click(function() {
        var msg = $('#message').val();
        socket.emit('message', {'message': msg});
        $('#message').val('');
    });
    */
    module.exports = new WebSocket;
});
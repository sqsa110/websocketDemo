define(function(require,exports,module){
    require('jquery.md5');
    var loginReq = require('servers/login-servers');
    function LoginInit(){
        this.$usernameObj = $('#username');
        this.$passwdObj = $('#passwd');
        this.$loginFormObj = $('#loginForm');
        this.$submitBtn = $('#send');
        this.init();
    }

    LoginInit.prototype.init = function(){
        this.evFn();
    }

    LoginInit.prototype.evFn = function(){
        this.$submitBtn.on('click',function(){

        });
    }

    LoginInit.prototype.loginSubmit = function(){


    }

    module.exports = LoginInit;
});
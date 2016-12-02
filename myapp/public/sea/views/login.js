define(function(require,exports,module){
    require('jquery.md5');
    var loginReq = require('servers/login-servers');

    function LoginInit(){
        this.$usernameObj = $('#username');
        this.$passwdObj = $('#passwd');
        this.$loginFormObj = $('#loginForm');
        this.$submitBtn = $('#send');
        this.$socketBtn = $('#button');
        this.ajax = loginReq.verification;
        this.init();
        return this;
    }

    LoginInit.prototype.init = function(){
        this.evFn();
        return this;
    }

    LoginInit.prototype.evFn = function(){
        var That = this;
        this.$submitBtn.on('click',function(){
            That.loginInfo();
        });
        this.$socketBtn.on('click',function(){

        });
        return this;
    }

    LoginInit.prototype.loginInfo = function(){
        var that = this;
        var opts = {}
        var name = this.$usernameObj.val();
        var pwd = $.md5(this.$passwdObj.val());
        opts.name = name;
        opts.pwd = pwd;
        opts.self = this;
        opts.callback = function(data){
            that.loginCallback(data);
        };
        this.loginSubmit(opts);
        return this;
    }

    LoginInit.prototype.loginSubmit = function(opts){
        this.ajax(opts);
        return this;
    }

    LoginInit.prototype.loginCallback = function(data){
        console.log(data);
        return this;
    }

    module.exports = LoginInit;
});
define(function(require,exports,module){
    var login = {};
    login.verification = function(opts){
        $.ajax({
            url : window.Config.LOGIN_HOST + 'login',
            type : 'POST',
            data : {
            	name : opts.name,
            	pwd : opts.pwd
            },
            dataType : 'json',
            context : opts.self,
            error : function(xhr,status,error){
            	console.log(xhr);
            	console.log(status);
            	console.log(error);
            	opts.callback && opts.callback(xhr,status,error);
            },
            success : function(data){
            	opts.callback && opts.callback(data);
            }
        })
    }

    module.exports = login;
});



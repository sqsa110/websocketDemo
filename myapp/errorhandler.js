/*
 *  Created by root on 2016-11-16
 */

//自定义中间，用来处理错误异常
module.exports = function(){
    return function(err,req,res,next){
        console.log('error occur during processing request.. ' + err.stack);
        var meta = '[' + new Date() + ']' + req.url + '\n';
        console.log(meta);
        res.sendfile('views/500.jade');
    }
}
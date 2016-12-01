var loginTools = {}
loginTools.logining = function(req,uid){
    var session = req.session;
    session.uid = uid ? uid : req.signedCookies.uid;
    req.session.save();
}


module.exports = loginTools;
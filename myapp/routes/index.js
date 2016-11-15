var express = require('express');
var router = express.Router();
//var socket = require('../socket');
/* GET home page.  */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/websock',function(req,res,next){
	var datas = [5,4,3,2,1];
	socket.socketIo.sendClick2Ev(datas);
	res.send({"aaa":"abc"});
});

module.exports = router;

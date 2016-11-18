var express = require('express');
var router = express.Router();
//var socket = require('../socket');
/* GET home page.  */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/redis',function(req,res,next){
	var session = req.session;
	session.count = session.count || 0;
	var n = session.count++;
	res.send(session.id + ',n:' + n);
	req.session.save();
});

router.get('/socket2',function(req,res,next){
	res.render('socket',{title:"Express"});
});

router.post('/socket2',function(req,res,next){
	req.session['name'] = req.body.name;
	res.render('socket',{title:"Express"});
})

router.get('/websock',function(req,res,next){
	var datas = [5,4,3,2,1];
	socket.socketIo.sendClick2Ev(datas);
	res.send({"aaa":"abc"});
});

module.exports = router;

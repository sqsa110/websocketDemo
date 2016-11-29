var express = require('express');
var router = express.Router();
var connection = require('./conf');
//var socket = require('../socket');
/* GET home page.  */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/redis',function(req,res,next){
	var session = req.session;
	console.log(req.session);
	session.count = session.count || 0;
	var n = session.count++;
	if(req.signedCookies && req.signedCookies.signed_monster){
		var signedMonster = req.signedCookies.signed_monster;
		res.cookie('signed_monster',signedMonster+'a',{signed:true});
		console.log(signedMonster);
	} else {
		res.cookie('signed_monster','nmm',{signed:true});
	}
	if(req.cookies && req.cookies.monster){
		var monster = req.cookies.monster;
		res.cookie('monster',(monster + 'a'));
		console.log(monster);
	} else {
		res.cookie('monster','nom');
	}
	res.send(session.id + ',n:' + n);
	res.end();
	req.session.save();
});

router.get('/socket2',function(req,res,next){
	res.render('socket',{title:"Express"});
});

router.get('/login',function(req,res,next){
	res.render('login',{title:"login"})
});

router.post('/login',function(req,res,next){
	console.log(req.body);
	connection.connect():

	connection.query('SELECT uid, from users',function(err,rows,fields){
		if(err) throw err;
		console.log(rews[0]);
		res.send({"aa":"bb"});
	});

	connection.end();
	
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

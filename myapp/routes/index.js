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
	console.log(connection);
	var name = req.body.name;
	var pwd = req.body.pwd;

	connection.connect();
	connection.query('SELECT uid,name,passwd from users where name = ?',[name],function(err,rows,fields){
		var sendObj = {}
		if(err){
			
			sendObj.code = 1010;
			sendObj.message = err;
			throw err;
		} else {
			if (rows.length == 1) {
				if (rows[0].passwd == pwd) {
					sendObj.code = 1000;
					sendObj.message = '登录成功';
					sendObj.uid = rows[0].uid;
					res.cookie('uid',sendObj.uid,{signed:true});
				} else {
					sendObj.code = 1002;
					sendObj.message = '密码错误';
				}
 			} else {
				sendObj.code = 1001;
				sendObj.message = '用户不存在!'
			}
		}

		console.log(rows[0]);
		res.send(sendObj);
		res.end();
		
	});

//	connection.end();
	
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

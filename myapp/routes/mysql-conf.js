var mysql = require('mysql');
/*
var connection = mysql.createConnection({
	host : '172.16.5.243',
	port : '3306',
	user : 'root',
	password : 'p@ssw0rd',
	database : 'websocketdemo'
});
*/
var connection = {
	host : '172.16.5.243',
	port : '3306',
	user : 'root',
	password : 'p@ssw0rd',
	database : 'websocketdemo'
}
connection = {
	host : '192.168.3.200',
	port : '3306',
	user : 'root',
	password : 'yaowan',
	database : 'websocketdemo'
}
var loginmysql = mysql.createPool(connection);
/*
connection = mysql.createConnection({
	host : '192.168.3.200',
	port : '3306',
	user : 'root',
	password : 'yaowan',
	database : 'websocketdemo'
});

*/
module.exports = { loginPool:loginmysql };
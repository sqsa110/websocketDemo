var Client = require('easymysql');
var setting = {
    'host' : '172.16.5.243',
    'user' : 'root',
    'password' : 'p@ssw0rd',
    ''
}
var mysql = Client.create({
   'maxconnections' : 10
});

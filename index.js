var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Xray = require('x-ray');
var x = Xray();
app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.use(express.static(__dirname));

http.listen(3000, function(){
  console.log('listening on *:3000');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('newUrl', function(msg){

	newUrl(msg);
  });
});

function newUrl(url){
	
	x(url,'h1')(function(err,title){
	 	console.log(title+err);
	  io.emit('result',title+err);
	
})
}
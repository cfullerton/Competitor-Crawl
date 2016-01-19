var express = require('express');
var app = express();
var http = require('http').Server(app);
var httpIn = require('http');
var io = require('socket.io')(http);
var Xray = require('x-ray');
var x = Xray();
var mapReader = require('sitemap-urls');
var robots = require('robots');
var parser = new robots.RobotsParser();
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.use(express.static(__dirname));
/*
http.listen(3000, function(){
  console.log('listening on *:3000');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('newUrl', function(msg){

	newUrl(msg);
  });
});
*/

function getSitemaps(robotsUrl){
var urlList=[];
parser.setUrl(robotsUrl, function(parser, success) {
  if(success) {
    parser.getSitemaps(function(sitemaps) {
      for (var i = 0;i <sitemaps.length;i++){
		 var req = httpIn.get(sitemaps[i], function(res) {
          var xml = '';
          res.on('data', function(chunk) {
          xml += chunk;
		  
  });

  res.on('end', function() {
	  
     urlList.push(mapReader.extractUrls(xml));
	 if (i = sitemaps.length - 1){
		 urlsLoaded(urlList);
	 }
  });
 });
	 
	  }
	  
    });
  }

});
}
function urlsLoaded(urlList){
	console.log(urlList);
}
function newUrl(url){
	
	x(url,'h1')(function(err,title){
	 	console.log(title+err);
	  io.emit('result',title+err);
	
})

io.emit('result',out);
}
var out = getSitemaps('http://www.apsltd.com/robots.txt');
console.log(out);

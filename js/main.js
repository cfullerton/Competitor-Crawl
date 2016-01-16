 var socket = io();
$(document).ready(function(){
	$('#url-submit').click(function(){
		socket.emit('newUrl', $('#url-input').val());

	});
	socket.on('result', function(title){
    console.log(title);
	console.log("r");
	$('#h1-tags').append("<li>"+title+"</li>");
  });
	
});
var net = require('net');
var util = require("util");
var fs = require('fs');
var clients = [];
var i = 0;
var fileName = "exemple.txt";
var server = net.createServer(function (socket){	

  console.log('server connected');

  socket.write('hello\r\n');
  //socket.pipe(socket);     
    var b = "";
	  socket.on('data',function(chunk){	  	
	  	console.log(""+chunk);
      b += chunk;
	  });

    socket.on('end', function() {
    	console.log('client disconnected');
      console.log("saved");
      fs.writeFile('message.txt', b, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      });//write
  });//socket on
});
/**
let's listening the server
*/
server.listen(1337, '127.0.0.1',function(){
	console.log("server bound on port %j and on address %j",server.address().port,server.address().address);	
});

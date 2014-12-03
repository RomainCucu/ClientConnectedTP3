var util = require("util");
var net = require("net");
var fs = require('fs');
var fileName = "exemple.txt";

/**
client connecting to the corresponding port Server
*/
var client = net.connect({port: 1337}, function () {
	util.log("Client connected");


fs.exists(fileName, function(exists) {
/**
If file exists, "exists" is true, else is false
*/
  if (exists) {  	
    fs.stat(fileName, function(error, stats) {
   	/**
    stats is an object with a field called "size" which is equal to file size (eg:21 octets)
    */    	
      fs.open(fileName, "r", function(error, fd) {
      	/**
      	fd is a file descriptor, dont know what does that mean
      	*/
        var buffer = new Buffer(stats.size); 		
        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length);
          client.write(data);
          fs.close(fd);
        });
      });
    });
  }else{
  	console.log("fileNotFound");
  }
});

	/*//client.write("un client se connecte");
	var fileStream = fs.createReadStream(fileName);

    fileStream.on('error', function(err){
        console.log(err);
    });

    fileStream.on('open',function(chunk){
    	//console.log('got %d bytes of data', chunk.length);
    	fileStream.pipe(client);
    	//console.log(chunk);
    	//client.write(chunk);
    });

    fileStream.on('end', function () {
  		console.log('got all bytes of data');
	});
*/
});

client.on('data', function(data) {
  console.log(''+data);
});
/**
client receive end event from server
*/
client.on('end', function() {
  console.log('client disconnected');
});
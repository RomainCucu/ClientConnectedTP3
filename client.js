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
      var stream = fs.createReadStream(fileName, { bufferSize: 64 * 1024 });
      stream.pipe(client);
    });
  }else{
  	console.log("fileNotFound");
  }
});
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
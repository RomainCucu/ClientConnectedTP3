//client.write("un client se connecte");
  var fileStream = fs.createReadStream(fileName);

    fileStream.on('error', function(err){
        console.log(err);
    });

    fileStream.on('open',function(chunk){
      fs.stat(fileName, function (err, stats) {/** we get lenght of the file we want to transfer*/
        if (err) throw err;
        
      });       
       fileStream.pause();
       console.log('there will be no more data for 1 second');
        setTimeout(function() {
          console.log('now data will start flowing again');
          fileStream.resume();
        }, 1000);
      //console.log('got %d bytes of data', chunk.length);
      //fileStream.pipe(client);
      //console.log(chunk);
      //client.write(chunk);
    });

    fileStream.on('end', function () {
      console.log('got all bytes of data');
  });




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
 
          console.log(data);
          fs.close(fd);
        });
      });
    });
  }else{
  	console.log("fileNotFound");
  }
});
var fs = require('fs'),
readStream = fs.createReadStream(srcPath);

readStream.on('data', function (chunk) {
  console.log('got %d bytes of data', chunk.length);
});

readStream.on('readable', function () {
  var chunk;
  while (null !== (chunk = readStream.read())) {
   console.log('got %d bytes of data', chunk.length);
  }
});

readStream.on('end', function () {
  console.log('got all bytes of data');
});


 var readStream = fs.createReadStream(fileName);
 readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(client);
  });

});


    //send a file to the server
    var fileStream = fs.createReadStream(fileName);
    fileStream.on('error', function(err){
        console.log(err);
    })

    fileStream.on('open',function() {
        fileStream.pipe(client);
    });
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
    if (exists) {  	
      fs.stat(fileName, function(error, stats) {
        transfer_object = {};
        transfer_object.fileName = fileName;
        transfer_object.size = stats.size;      
        transfer_object.stream = fs.createReadStream(fileName, { bufferSize: 64 * 1024 });
        client.write("upload_demand");
      });
    }else{
    	console.log("fileNotFound");
    }
  });
});

client.on('data', function(data) {
  if(data=="upload_demand_ok"){
    console.log(''+data);
    client.write("fileName"+transfer_object.fileName);
  }
  else if(data == "fileName_ok"){
    console.log(''+data);
    client.write("size"+transfer_object.size)
  }
  else if(data == "size_ok"){
    console.log(''+data);
    transfer_object.stream.pipe(client,{ end: false });
  }else if(data.toString().indexOf("uploading")>-1){
    data = parseInt(data.toString().replace("uploading",""));
   if(data>=100) client.write('upload_success');
  }
});
/**
client receive end event from server
*/
client.on('end', function() {
  console.log('client disconnected');
});
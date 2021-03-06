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
    if(exists){//if file exist
      fs.stat(fileName, function (err, stats) {//we want to know length of my file
        if (err) throw err;
        if(stats.size>=100){//if size of the file is superior thant 100 octet
          var rest = stats.size%100;//to send data 100 byte per 100 byte then to send the rest
          var result = stats.size-rest;// if size = 1260, we do 100 by 100 then 1 by 1
          var size = stats.size;
          var increment = 99;
          var i = 0;
          sendData();
            function sendData(){
              var fileStream = fs.createReadStream(fileName,{start: i, end:(i+increment)});
              fileStream.on('error', function(err){
                console.log(err);
              });
              fileStream.on('open',function(chunk){
                fileStream.pipe(client,{ end: false });
              });
              fileStream.on('end',function(chunk){                
                if(i<(result-100)){
                  console.log('bite from '+i+' to '+(i+99)+' sent'); 
                  i+=100;
                  setTimeout(sendData,100);
                }else if(i<size){
                  increment=1;
                  console.log('bite from '+i+' to '+(i+1)+' sent');
                  i++;
                  setTimeout(sendData,100);
                }
                else return;
              });              
            }           
          }//if stats.size        
      });//fs.stat

    }else{
      console.log("file not found");//file does not exist
    }
  });//fs.exists
});

client.on('data', function(data) {
  //console.log(''+data);
});
/**
client receive end event from server
*/
client.on('end', function() {
  console.log('client disconnected');
});
var net = require('net');
var util = require("util");
var fs = require('fs');
var clients = [];
var i = 0;
var receive_object = {};
receive_object.contenu = "";
var server = net.createServer(function (socket){	

  console.log('server connected');

  socket.write('hello\r\n');

  //socket.pipe(socket);     
    
	  socket.on('data',function(data){	            
	  	if(data.toString() == "upload_demand"){
        socket.write("upload_demand_ok");
      }else if(data.toString().indexOf("fileName")>-1){
        data = data.toString().replace("fileName","");
        receive_object.fileName = data;
        socket.write("fileName_ok");
      }else if(data.toString().indexOf("size")>-1){
        data = data.toString().replace("size","");
        receive_object.size_total = data;        
        receive_object.size_received = 0;
        socket.write("size_ok");
      }else if(data.toString()=="upload_success"){        
        fs.writeFile("server_"+receive_object.fileName, receive_object.contenu, function (err) {
          if (err) throw err;
          console.log('It\'s saved!');
        });//write
      }
      else{
        receive_object.size_received += 64*1024;
        socket.write("uploading"+parseInt(receive_object.size_received/receive_object.size_total*100));
        receive_object.contenu += data;
      }
      
	  });

    socket.on('end', function() {
    	console.log('client disconnected');
      
  });//socket on
});
/**
let's listening the server
*/
server.listen(1337, '127.0.0.1',function(){
	console.log("server bound on port %j and on address %j",server.address().port,server.address().address);	
});

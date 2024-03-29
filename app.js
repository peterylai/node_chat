var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('join', function(name){
    socket.nickname = name;
    io.emit('user join', name);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', socket.nickname + " : " + msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
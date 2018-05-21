var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usocket = [];


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    //socket.on('user connected', function(){
    //    io.emit('user connected');
    //});
    socket.on('disconnected', function(){
         io.emit('user disconnected');
    });
    socket.on('join', function(name){
        usocket[name] = socket;
        io.emit('join', name);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

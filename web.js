var express = require('express');
var app = express(), server = require('http').createServer(app), io = require('socket.io').listen(server);
server.listen(80);
app.use(express.static(__dirname + "/public"));
app.use(app.router);
var currentStatus = 3;
app.get('/websockets', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/console', function (req, res) {
  res.sendfile(__dirname + '/console.html');
});
app.get('/longpoll', function (req, res) {
  if (currentStatus === 0) {
    res.sendfile(__dirname + '/leftPhone.html');
  } else if (currentStatus === 1) {
    res.sendfile(__dirname + '/rightPhone.html');
  } else if (currentStatus === 2) {
    res.sendfile(__dirname + '/frontPhone.html');
  } else {
    res.sendfile(__dirname + '/stopPhone.html');
  }
});

io.set('log level', 1);
io.sockets.on('connection', function (socket) {
  console.log("New client connected");
  if (currentStatus === 0) {
    socket.emit('left', {cycles: 5});
  } else if (currentStatus === 1) {
    socket.emit('right', {cycles: 5});
  } else if (currentStatus === 2) {
    socket.emit('front', {cycles: 5});
  } else {
    socket.emit('left', {cycles: 5});
  }
  socket.on('left', function (s) {
    io.sockets.emit('left', {cycles: 5});
    currentStatus = 0;
  });
  socket.on('right', function (s) {
    io.sockets.emit('right', {cycles: 5});
    currentStatus = 1;
  });
  socket.on('front', function (s) {
    io.sockets.emit('front', {cycles: 5});
    currentStatus = 2;
  });
  socket.on('stop', function (s) {
    io.sockets.emit('stop', {cycles: 5});
    currentStatus = 3;
  });
});
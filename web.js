var express = require('express');
var app = express(), server = require('http').createServer(app), io = require('socket.io').listen(server);
server.listen(80);
app.use(express.static(__dirname + "/public"));
app.use(app.router);
app.get('/dd', function (req, res) {
  res.sendfile(__dirname + '/differentialDrive.html');
});
app.get('/ddconsole', function (req, res) {
  res.sendfile(__dirname + '/differentialDriveController.html');
});
app.get('/sd', function (req, res) {
  res.sendfile(__dirname + '/servoDrive.html');
});
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
  socket.on('differentialDriveSpeedInput', function (s) {
    io.sockets.emit('differentialDriveSpeedOutput', {LEFT_SPEED: s.LEFT_SPEED, RIGHT_SPEED: s.RIGHT_SPEED});
  });

});

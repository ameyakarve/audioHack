var socket = io.connect();
socket.on('servoDriveSpeedOutput', function (data) {
  LEFT_SPEED = data.LEFT_SPEED;
  RIGHT_SPEED = data.RIGHT_SPEED;
});

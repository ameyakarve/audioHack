var context;
var TRACK_TIME = 100;
var THROTTLE_TIME = 200;

var LEFT_SPEED = 1.0, RIGHT_SPEED = 1.0; // Vary from 0.0 to 1.0 in steps of 10.

var socket = io.connect();
socket.on('differentialDriveSpeedOutput', function (data) {
  LEFT_SPEED = data.LEFT_SPEED;
RIGHT_SPEED  = data.RIGHT_SPEED;
});
function playSound(channel1, channel2, whenToPlay) {
  var destination = context.destination,
    osc = context.createOscillator(),
    gainL = context.createGainNode(),
    gainR = context.createGainNode(),
    splitter = context.createChannelSplitter(2),
    merger = context.createChannelMerger(2);

  osc.frequency.value = 5000;
  osc.connect(gainL);
  osc.connect(gainR);

  gainL.connect(merger, 0, 0);
  gainR.connect(merger, 0, 1);

  gainL.gain.value = channel1;
  gainR.gain.value = channel2;

  osc.start(whenToPlay);

  osc.stop(whenToPlay + THROTTLE_TIME / 10000);

  merger.connect(destination);
}
function scheduleTracks() {
  var i;
  var leftOn = 1.0, rightOn = 1.0;
  for (i = 0; i < 1; i += 0.1) {
    if (i >= LEFT_SPEED) {
      leftOn = 0.0;
    }
    if (i >= RIGHT_SPEED) {
      rightOn = 0.0;
    }
    playSound(leftOn, rightOn, context.currentTime + i);
  }
}
function initializeTrack() {
  //Try using the oscillator here
  setInterval(scheduleTracks, THROTTLE_TIME);
}
function finishedLoading() {
  //soundBuffer = bufferList[0];
  setTimeout(initializeTrack, THROTTLE_TIME / 2);
}
function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  finishedLoading();
}
//window.onload = init;
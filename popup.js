var SECOND = 1000
var MINUTE = 60*SECOND
var AUTO_CLOSE_NOTIF_TIME = 5*MINUTE
var DEFAULT_TIME = 20
var TEN_SEC = 10
var START = 1
var RESET = 2
var CONTINUE = 3

// add the current number of minutes
function show_minutes() {
  // Use default value, 20.
  chrome.storage.sync.get({
    minutes: DEFAULT_TIME,
  }, function(options) {
  	var elem = document.getElementById('minutes')
  	var content = elem.innerHTML + ' '
    elem.innerHTML = options.minutes + content
    elem.value = options.minutes
  });
}

// resets the timer
function reset () {
	sendMsg({command: RESET}, function(response) { clear_timer() } )
}

// clear the timer display
function clear_timer () {
  document.getElementById('timeLeft').innerHTML = ''
}

// starts the timer
function start_timer () {
	var minutes = document.getElementById('minutes').value
	sendMsg({command: START, time: minutes*MINUTE})
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.command) {
      case CONTINUE:
        var min = request.time > MINUTE ? Math.floor(request.time / SECOND) : 0
        var sec = 0
        if (request.time < MINUTE) {
          if ((request.time / SECOND) >= TEN_SEC) {
            sec = request.time / SECOND
          } else {
            sec = '0' + request.time / SECOND
          }
        } else {
          sec = request.time % SECOND
        }
        show_timer(min, sec)
        break;
    }
});

function show_timer (min, sec) {
  document.getElementById('timeLeft').innerHTML = min + ":" + sec
}

// send message to component
function sendMsg (message, callback) {
  chrome.runtime.sendMessage(message, callback);
}

document.addEventListener('DOMContentLoaded', show_minutes)
document.getElementById("resetBtn").addEventListener("click", reset)
document.getElementById("startBtn").addEventListener("click", start_timer)
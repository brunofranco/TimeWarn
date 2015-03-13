var SECOND = 1000
var MINUTE = 60*SECOND
var AUTO_CLOSE_NOTIF_TIME = 5*MINUTE
var DEFAULT_TIME = 20
var START = 1
var STATUS = 2
var RESET = 3

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
	document.getElementById('minutes').innerHTML = ''
	sendMsg({command: RESET})
}

// Starts the timer.
function start_clock () {
	var minutes = document.getElementById('minutes').value
	sendMsg({command: START, time: minutes*MINUTE})
}

function sendMsg (message) {
	chrome.runtime.sendMessage(message);
}

document.addEventListener('DOMContentLoaded', show_minutes)
document.getElementById("resetBtn").addEventListener("click", reset)
document.getElementById("startBtn").addEventListener("click", start_clock)
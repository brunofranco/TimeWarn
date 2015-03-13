var MINUTE = 60*1000
var AUTO_CLOSE_NOTIF_TIME = 5*MINUTE
var START = 1
var STATUS = 2
var RESET = 3
var SECOND = 1000
var timeLeft = 0

// Start the counter
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request.command == START) {
  		timeLeft = request.time
  		if (request.time == 0) {
  			notification()
  		} else {
  			setTimeout(function() { sendMsg(request); }, SECOND)
  		}
  	}

  	if (request.command == STATUS) {
  		sendResponse({command: STATUS, time: timeLeft})
  	}
});

// Send message each second
// Needed to keep track of the seconds left
function sendMsg (request) {
	chrome.runtime.sendMessage({command: START, time: request.time-SECOND});
}

// Creates the notification
// Autoclose notification after 5 minutes.
function notification () {
	var path = chrome.runtime.getURL("/tomato.png")
	var notifId = Math.random().toString()
	chrome.notifications.create(
		  notifId,{   
		      type: "basic", 
		      title: "Time Warn", 
		      message: "Time to take a break!",
		      iconUrl: path
		  },
		  function() {
		  	    setTimeout(function() {
    				chrome.notifications.clear(notifId, function() {});
				}, AUTO_CLOSE_NOTIF_TIME); 
		  }
	);
}
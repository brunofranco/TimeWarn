var SECOND = 1000
var MINUTE = 60*SECOND
var AUTO_CLOSE_NOTIF_TIME = 0.1*MINUTE
var START = 1
var RESET = 2
var CONTINUE = 3
var timeLeft = 0

// Start the counter
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	switch (request.command) {
  		case CONTINUE:
  			if (timeLeft == 0) {
					notification("Time to take a break!")
          sendContMsg({command: CONTINUE, time: 0})
          timeLeft = -1
          break;
        }
        if (timeLeft < 0) { break;}
      case START:
        setTimeout(function() { sendContMsg({command: CONTINUE, time: request.time - SECOND}) }, SECOND)
        timeLeft = request.time-SECOND
        break;
  		case RESET:
  			timeLeft = -1
  			sendResponse({command: RESET})
  			break;
  	}
});

// Send message each second
// Needed to keep track of the seconds left
function sendContMsg (message) {
	chrome.runtime.sendMessage(message);
}

// Creates the notification
function notification (message) {
	var path = chrome.runtime.getURL("/tomato.png")
	var notifId = Math.random().toString()
	chrome.notifications.create(
		  notifId,
      {   
		      type: "basic", 
		      title: "Time Warn", 
		      message: message,
		      iconUrl: path
		  },
		  function() {
		  	    setTimeout(function() {
    				chrome.notifications.clear(notifId, function() {});
				}, AUTO_CLOSE_NOTIF_TIME); 
		  }
	);
}
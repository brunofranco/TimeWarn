
// Saves options to chrome.storage
function save_options () {
	var min = document.getElementById("minutes").value;

	chrome.storage.sync.set({
	    minutes: min,
	  }, function() {
	    // Update status to let user know options were saved.
	    var status = document.getElementById('status');
	    status.textContent = 'Options saved.';
	    setTimeout(function() {
	      status.textContent = '';
	    }, 750);
	  });

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value, 20.
  chrome.storage.sync.get({
    minutes: 20,
  }, function(options) {
    document.getElementById('minutes').value = options.minutes;
  });
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById("saveBtn").addEventListener("click", save_options);
const jsInitCheckTimer = setInterval(jsLoaded, 1000);
let reaction_button = "";

function jsLoaded() {
	reaction_button = document.getElementById("reaction-control-panel");
	if (reaction_button !== null) {
		clearInterval(jsInitCheckTimer);
		chrome.storage.local.get(["display", "position_x", "position_y", "transparency"], save => {
			reaction_button.style.display = save.display ? "block" : "none";
			reaction_button.style.position = "absolute";
			reaction_button.style.right = save.position_x + "px";
			reaction_button.style.top = save.position_y + "px";
			reaction_button.style.opacity = save.transparency / 100;
		});
	}
}